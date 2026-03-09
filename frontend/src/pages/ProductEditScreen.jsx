import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(({ data }) => {
      setName(data.name);
      setPrice(data.price);
      setImage(data.image);
      setCategory(data.category);
      setCountInStock(data.countInStock);
      setDescription(data.description);
    });
  }, [id]);

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data.imagePath);
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `/api/products/${id}`,
        { name, price, image, category, countInStock, description },
        { headers: { Authorization: `Bearer ${userInfo.token}` } },
      );
      navigate("/admin/productlist");
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page fade-up" style={{ maxWidth: 660 }}>
      <Link
        to="/admin/productlist"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#8a8278",
          fontSize: "0.85rem",
          marginBottom: 32,
          textDecoration: "none",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Products
      </Link>

      <p
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#c9a84c",
          marginBottom: 6,
        }}
      >
        Admin
      </p>
      <h1
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "2.2rem",
          fontWeight: 400,
          marginBottom: 32,
        }}
      >
        Edit Product
      </h1>

      <div
        style={{
          background: "#1a1a1a",
          border: "1px solid #2e2e2e",
          borderRadius: 4,
          padding: "36px 32px",
        }}
      >
        <form onSubmit={submitHandler}>
          {/* Name */}
          <div style={{ marginBottom: 20 }}>
            <label className="label">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Price */}
          <div style={{ marginBottom: 20 }}>
            <label className="label">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: 20 }}>
            <label className="label">Product Image</label>

            {/* File picker */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                background: "#242424",
                border: "1px dashed #2e2e2e",
                borderRadius: 4,
                cursor: "pointer",
                marginBottom: 10,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#c9a84c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#2e2e2e")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a84c"
                strokeWidth="1.5"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: uploading ? "#c9a84c" : "#8a8278",
                }}
              >
                {uploading ? "Uploading..." : "Click to upload from your PC"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={uploadHandler}
                style={{ display: "none" }}
              />
            </label>

            {/* Manual URL fallback */}
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input-field"
              placeholder="Or paste an image URL"
            />
          </div>

          {/* Image Preview */}
          {image && (
            <div
              style={{
                marginBottom: 20,
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #2e2e2e",
              }}
            >
              <img
                src={image}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: 220,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Category */}
          <div style={{ marginBottom: 20 }}>
            <label className="label">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Count In Stock */}
          <div style={{ marginBottom: 20 }}>
            <label className="label">Count in Stock</label>
            <input
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: 28 }}>
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              rows={4}
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || uploading}
            style={{
              width: "100%",
              padding: 14,
              background: loading || uploading ? "#8a8278" : "#c9a84c",
              color: "#0f0f0f",
              border: "none",
              borderRadius: 4,
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: loading || uploading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditScreen;
