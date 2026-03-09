import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const cartCount = cartItems.reduce((a, c) => a + (c.qty || 1), 0);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(15,15,15,0.96)" : "#0f0f0f",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "1px solid #2e2e2e",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 5vw",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#0f0f0f",
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              M
            </span>
          </div>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.4rem",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "#e8e4dc",
            }}
          >
            Modern Living
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            to="/cart"
            style={{
              position: "relative",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#e8e4dc",
              borderRadius: 4,
              transition: "color 0.2s",
              textDecoration: "none",
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 6,
                  background: "#c9a84c",
                  color: "#0f0f0f",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                }}
              >
                {cartCount}
              </span>
            )}
            <span style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}>
              Cart
            </span>
          </Link>

          {userInfo ? (
            <>
              <Link
                to="/profile"
                style={{
                  padding: "8px 14px",
                  color: "#c9a84c",
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
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
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {userInfo.name.split(" ")[0]}
              </Link>
              {userInfo.isAdmin && (
                <Link
                  to="/admin/productlist"
                  style={{
                    padding: "8px 14px",
                    color: "#8a8278",
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "1px solid #2e2e2e",
                  color: "#8a8278",
                  padding: "8px 16px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "DM Sans, sans-serif",
                  transition: "all 0.2s",
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                background: "#c9a84c",
                color: "#0f0f0f",
                padding: "9px 22px",
                borderRadius: 4,
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
