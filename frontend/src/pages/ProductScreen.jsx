import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

axios.defaults.baseURL = "https://furniture-store-uvvx.onrender.com";

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading)
    return (
      <div
        className="page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <div style={{ textAlign: "center", color: "#8a8278" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "2px solid #2e2e2e",
              borderTopColor: "#c9a84c",
              borderRadius: "50%",
              margin: "0 auto 16px",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Loading product...
        </div>
      </div>
    );
  if (!product)
    return (
      <div className="page">
        <h2>Product not found</h2>
      </div>
    );

  return (
    <div className="page fade-up">
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#8a8278",
          fontSize: "0.85rem",
          letterSpacing: "0.06em",
          marginBottom: 48,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8278")}
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
        Back to Shop
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            background: "#1a1a1a",
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid #2e2e2e",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "1",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Details */}
        <div style={{ paddingTop: 8 }}>
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: 12,
            }}
          >
            {product.category}
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2rem,3vw,2.8rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {product.name}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "2rem",
                color: "#c9a84c",
              }}
            >
              ${product.price}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "3px 12px",
                borderRadius: 20,
                fontSize: "0.75rem",
                fontWeight: 500,
                background:
                  product.countInStock > 0
                    ? "rgba(46,204,113,0.12)"
                    : "rgba(192,57,43,0.12)",
                color: product.countInStock > 0 ? "#2ecc71" : "#c0392b",
              }}
            >
              {product.countInStock > 0
                ? `${product.countInStock} in stock`
                : "Out of stock"}
            </span>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #2e2e2e",
              marginBottom: 28,
            }}
          />

          <p
            style={{
              color: "#8a8278",
              lineHeight: 1.9,
              fontWeight: 300,
              fontSize: "0.95rem",
              marginBottom: 36,
            }}
          >
            {product.description}
          </p>

          <button
            onClick={handleAdd}
            disabled={product.countInStock === 0}
            style={{
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: 4,
              background:
                product.countInStock === 0
                  ? "#2e2e2e"
                  : added
                    ? "#2ecc71"
                    : "#c9a84c",
              color: product.countInStock === 0 ? "#8a8278" : "#0f0f0f",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: product.countInStock === 0 ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {product.countInStock === 0
              ? "Out of Stock"
              : added
                ? "✓ Added to Cart"
                : "Add to Cart"}
          </button>

          <div
            style={{
              marginTop: 24,
              padding: "16px 20px",
              background: "#1a1a1a",
              border: "1px solid #2e2e2e",
              borderRadius: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                color: "#8a8278",
                fontSize: "0.8rem",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure checkout powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
