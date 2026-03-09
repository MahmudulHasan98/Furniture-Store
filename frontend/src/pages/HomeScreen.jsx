import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/products").then(({ data }) => { setProducts(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 5vw" }}>
      {/* Hero */}
      <div style={{
        padding: "80px 0 60px", borderBottom: "1px solid #2e2e2e",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c" }}>New Collection</span>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.1, color: "#e8e4dc", maxWidth: 600 }}>
          Curated goods,<br /><em style={{ color: "#c9a84c" }}>crafted with care.</em>
        </h1>
        <p style={{ color: "#8a8278", maxWidth: 480, lineHeight: 1.8, fontWeight: 300 }}>Discover our handpicked selection of premium products designed to elevate your everyday.</p>
      </div>

      {/* Products */}
      <div style={{ padding: "56px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 400 }}>Latest Products</h2>
          <span style={{ color: "#8a8278", fontSize: "0.85rem" }}>{products.length} items</span>
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ background: "#1a1a1a", borderRadius: 4, overflow: "hidden", animation: "pulse 1.5s ease infinite alternate" }}>
                <div style={{ paddingTop: "120%", background: "#242424" }}/>
                <div style={{ padding: 16 }}>
                  <div style={{ height: 14, background: "#2e2e2e", borderRadius: 2, marginBottom: 8 }}/>
                  <div style={{ height: 12, background: "#2e2e2e", borderRadius: 2, width: "60%" }}/>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 24 }}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: "#1a1a1a", border: `1px solid ${hovered ? "#c9a84c" : "#2e2e2e"}`,
        borderRadius: 4, overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "none",
      }}>
        <div style={{ position: "relative", overflow: "hidden", paddingTop: "110%", background: "#242424" }}>
          <img src={product.image} alt={product.name} style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease",
          }} />
          {product.countInStock === 0 && (
            <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(192,57,43,0.9)", color: "white", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 2 }}>Sold Out</div>
          )}
        </div>
        <div style={{ padding: "16px 18px 20px" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a8278", marginBottom: 6 }}>{product.category || "Product"}</p>
          <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.15rem", fontWeight: 500, color: "#e8e4dc", marginBottom: 10, lineHeight: 1.3 }}>{product.name}</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", color: "#c9a84c" }}>${product.price}</span>
            <span style={{ fontSize: "0.75rem", color: hovered ? "#c9a84c" : "#8a8278", letterSpacing: "0.08em", transition: "color 0.2s" }}>View →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeScreen;
