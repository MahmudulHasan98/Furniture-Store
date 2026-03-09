import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ProductListScreen from "./pages/ProductListScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          {/* 2. ADD THIS ROUTE */}
          <Route path="/admin/productlist" element={<ProductListScreen />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
