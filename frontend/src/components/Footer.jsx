const Footer = () => {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid #2e2e2e",
        marginTop: "auto",
      }}
    >
      {/* Main Footer */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "64px 5vw 48px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        {/* Brand Column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
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
          </div>
          <p
            style={{
              color: "#8a8278",
              fontSize: "0.9rem",
              lineHeight: 1.9,
              maxWidth: 280,
              marginBottom: 28,
              fontWeight: 300,
            }}
          >
            Curated goods crafted with care. We bring you a handpicked selection
            of premium products designed to elevate your everyday life.
          </p>
          {/* Social Icons */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              {
                label: "Twitter",
                path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
              },
              {
                label: "Instagram",
                path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
              },
              {
                label: "Facebook",
                path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
              },
            ].map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 4,
                  border: "1px solid #2e2e2e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8a8278",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c9a84c";
                  e.currentTarget.style.color = "#c9a84c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2e2e2e";
                  e.currentTarget.style.color = "#8a8278";
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.1rem",
              fontWeight: 500,
              marginBottom: 20,
              color: "#e8e4dc",
            }}
          >
            Shop
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {["All Products", "New Arrivals", "Best Sellers", "Sale"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="/"
                    style={{
                      color: "#8a8278",
                      fontSize: "0.88rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#c9a84c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#8a8278")
                    }
                  >
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.1rem",
              fontWeight: 500,
              marginBottom: 20,
              color: "#e8e4dc",
            }}
          >
            Support
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              "FAQ",
              "Shipping Policy",
              "Returns & Exchanges",
              "Track Your Order",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    color: "#8a8278",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#c9a84c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#8a8278")
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.1rem",
              fontWeight: 500,
              marginBottom: 8,
              color: "#e8e4dc",
            }}
          >
            Stay in the loop
          </h4>
          <p
            style={{
              color: "#8a8278",
              fontSize: "0.85rem",
              marginBottom: 16,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Get exclusive deals and new arrivals straight to your inbox.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                background: "#1a1a1a",
                border: "1px solid #2e2e2e",
                borderRadius: 4,
                padding: "11px 14px",
                color: "#e8e4dc",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.85rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#c9a84c")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#2e2e2e")}
            />
            <button
              style={{
                padding: "11px",
                background: "#c9a84c",
                color: "#0f0f0f",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e8c97a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#c9a84c")
              }
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid #1e1e1e",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "20px 5vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            color: "#8a8278",
            fontSize: "0.78rem",
            letterSpacing: "0.04em",
          }}
        >
          © {new Date().getFullYear()} Modern Living. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
            (item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "#8a8278",
                  fontSize: "0.78rem",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8278")}
              >
                {item}
              </a>
            ),
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8a8278"
            strokeWidth="1.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ color: "#8a8278", fontSize: "0.78rem" }}>
            Secured by Stripe
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
