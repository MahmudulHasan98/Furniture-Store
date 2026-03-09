import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://furniture-store-uvvx.onrender.com";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const { userInfo } = useAuth();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        fetchProducts();
      } catch {
        alert("Error deleting");
      }
    }
  };

  const createProductHandler = async () => {
    try {
      await axios.post(
        "/api/products",
        {},
        { headers: { Authorization: `Bearer ${userInfo.token}` } },
      );
      fetchProducts();
    } catch {
      alert("Error creating");
    }
  };

  return (
    <div className="page fade-up">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: 6,
            }}
          >
            Admin Panel
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "2.2rem",
              fontWeight: 400,
            }}
          >
            Product Management
          </h1>
        </div>
        <button
          onClick={createProductHandler}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            background: "#c9a84c",
            color: "#0f0f0f",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Product
        </button>
      </div>

      <div
        style={{
          background: "#1a1a1a",
          border: "1px solid #2e2e2e",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2e2e2e" }}>
              {["ID", "Name", "Price", "Category", "Stock", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 20px",
                      textAlign: "left",
                      fontSize: "0.7rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#8a8278",
                      fontWeight: 400,
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product._id}
                style={{
                  borderBottom:
                    i < products.length - 1 ? "1px solid #242424" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#242424")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    color: "#8a8278",
                  }}
                >
                  {product._id.slice(-8)}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1rem",
                  }}
                >
                  {product.name}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    color: "#c9a84c",
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  ${product.price}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    color: "#8a8278",
                    fontSize: "0.85rem",
                  }}
                >
                  {product.category}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: "0.75rem",
                      background:
                        product.countInStock > 0
                          ? "rgba(46,204,113,0.12)"
                          : "rgba(192,57,43,0.12)",
                      color: product.countInStock > 0 ? "#2ecc71" : "#c0392b",
                    }}
                  >
                    {product.countInStock}
                  </span>
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      style={{
                        padding: "6px 14px",
                        border: "1px solid #2e2e2e",
                        borderRadius: 4,
                        color: "#e8e4dc",
                        fontSize: "0.8rem",
                        letterSpacing: "0.06em",
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      style={{
                        padding: "6px 14px",
                        background: "rgba(192,57,43,0.12)",
                        border: "1px solid rgba(192,57,43,0.3)",
                        borderRadius: 4,
                        color: "#c0392b",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListScreen;
