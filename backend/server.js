import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Models
import Product from "./models/product.js";
import User from "./models/user.js";
import Order from "./models/order.js";

// Utilities & Middleware
import generateToken from "./utils/generateToken.js";
import { protect, admin } from "./middleware/authMiddleware.js";

// 1. CONFIG
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 2. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 3. SERVE UPLOADED IMAGES AS STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// 4. MULTER CONFIG — saves uploaded files to /uploads folder
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// 5. DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// --- ROUTES ---

// @desc    Upload product image
// @route   POST /api/upload
app.post("/api/upload", protect, admin, upload.single("image"), (req, res) => {
  res.json({ imagePath: `/uploads/${req.file.filename}` });
});

// @desc    Process Stripe Payment
// @route   POST /api/payment/process
app.post("/api/payment/process", protect, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: "Amount is required" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("STRIPE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all products
// @route   GET /api/products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// @desc    Register User
// @route   POST /api/users
app.post("/api/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Login User
// @route   POST /api/users/login
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Create new order
// @route   POST /api/orders
app.post("/api/orders", protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice, paymentResult } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const itemsForDb = orderItems.map((item) => ({
      name: item.name,
      qty: Number(item.qty),
      image: item.image,
      price: Number(item.price),
      product: item._id,
    }));

    const order = new Order({
      user: req.user._id,
      orderItems: itemsForDb,
      shippingAddress,
      totalPrice: Number(totalPrice),
      isPaid: paymentResult?.status === "succeeded",
      paidAt: paymentResult?.status === "succeeded" ? Date.now() : null,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("❌ ORDER SAVE ERROR:", error.message);
    res
      .status(500)
      .json({ message: "Order creation failed: " + error.message });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
app.get("/api/orders/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// --- ADMIN ROUTES ---

// @desc    Create Sample Product
// @route   POST /api/products
app.post("/api/products", protect, admin, async (req, res) => {
  try {
    const product = new Product({
      name: "Sample Name",
      price: 0,
      user: req.user._id,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      category: "Sample Category",
      countInStock: 0,
      description: "Sample Description",
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
});

// @desc    Update Product
// @route   PUT /api/products/:id
app.put("/api/products/:id", protect, admin, async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
app.delete("/api/products/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
