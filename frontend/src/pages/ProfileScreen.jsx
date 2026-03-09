import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = "https://furniture-store-uvvx.onrender.com";

const ProfileScreen = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) return;
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    axios
      .get("/api/orders/myorders", config)
      .then(({ data }) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userInfo]);

  return (
    <div className="page fade-up">
      <h1
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "2.4rem",
          fontWeight: 400,
          marginBottom: 40,
        }}
      >
        My Account
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 32,
          alignItems: "start",
        }}
      >
        {/* User Info */}
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #2e2e2e",
            borderRadius: 4,
            padding: 28,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.8rem",
              color: "#0f0f0f",
              marginBottom: 20,
            }}
          >
            {userInfo?.name?.charAt(0)}
          </div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              marginBottom: 4,
            }}
          >
            {userInfo?.name}
          </h2>
          <p
            style={{ color: "#8a8278", fontSize: "0.85rem", marginBottom: 24 }}
          >
            {userInfo?.email}
          </p>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #2e2e2e",
              marginBottom: 20,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.85rem",
              }}
            >
              <span style={{ color: "#8a8278" }}>Total Orders</span>
              <span
                style={{
                  color: "#c9a84c",
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.1rem",
                }}
              >
                {orders.length}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.85rem",
              }}
            >
              <span style={{ color: "#8a8278" }}>Role</span>
              <span>{userInfo?.isAdmin ? "Admin" : "Customer"}</span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.6rem",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Order History
          </h2>
          {loading ? (
            <p style={{ color: "#8a8278" }}>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                background: "#1a1a1a",
                border: "1px solid #2e2e2e",
                borderRadius: 4,
              }}
            >
              <p style={{ color: "#8a8278", marginBottom: 16 }}>
                No orders yet
              </p>
            </div>
          ) : (
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
                    {["Order ID", "Date", "Total", "Status"].map((h) => (
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
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr
                      key={order._id}
                      style={{
                        borderBottom:
                          i < orders.length - 1 ? "1px solid #242424" : "none",
                        transition: "background 0.2s",
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
                          padding: "16px 20px",
                          fontSize: "0.78rem",
                          color: "#8a8278",
                          fontFamily: "monospace",
                        }}
                      >
                        {order._id.slice(-8).toUpperCase()}
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "0.9rem" }}>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td
                        style={{
                          padding: "16px 20px",
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "1.05rem",
                          color: "#c9a84c",
                        }}
                      >
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: 20,
                            fontSize: "0.75rem",
                            background: order.isPaid
                              ? "rgba(46,204,113,0.12)"
                              : "rgba(201,168,76,0.12)",
                            color: order.isPaid ? "#2ecc71" : "#c9a84c",
                          }}
                        >
                          {order.isPaid
                            ? `Paid ${order.paidAt?.substring(0, 10)}`
                            : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
