import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0).toFixed(2);
  const totalItems = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <div className="page fade-up">
      <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.4rem", fontWeight: 400, marginBottom: 40 }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2e2e2e" strokeWidth="1" style={{ marginBottom: 24 }}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <p style={{ color: "#8a8278", marginBottom: 24 }}>Your cart is empty</p>
          <Link to="/" style={{ background: "#c9a84c", color: "#0f0f0f", padding: "12px 28px", borderRadius: 4, fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Continue Shopping</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "start" }}>
          {/* Items */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr auto auto auto", gap: "0 20px", padding: "0 0 12px", borderBottom: "1px solid #2e2e2e", marginBottom: 8 }}>
              {["", "Product", "Price", "Qty", ""].map((h, i) => (
                <span key={i} style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8a8278" }}>{h}</span>
              ))}
            </div>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto auto auto", gap: "0 20px", alignItems: "center", padding: "20px 0", borderBottom: "1px solid #1a1a1a" }}>
                <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4, border: "1px solid #2e2e2e" }} />
                <div>
                  <Link to={`/product/${item._id}`} style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem", color: "#e8e4dc", textDecoration: "none" }}>{item.name}</Link>
                  <p style={{ fontSize: "0.75rem", color: "#8a8278", marginTop: 4 }}>${item.price} each</p>
                </div>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", color: "#c9a84c" }}>${(item.price * item.qty).toFixed(2)}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid #2e2e2e", borderRadius: 4, overflow: "hidden" }}>
                  <button onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))} style={{ width: 32, height: 32, background: "#1a1a1a", border: "none", color: "#e8e4dc", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ width: 36, textAlign: "center", fontSize: "0.9rem", background: "#242424", height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ width: 32, height: 32, background: "#1a1a1a", border: "none", color: "#e8e4dc", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
                <button onClick={() => removeFromCart(item._id)} style={{ background: "none", border: "none", color: "#8a8278", cursor: "pointer", padding: 6, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#c0392b"}
                  onMouseLeave={e => e.currentTarget.style.color = "#8a8278"}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 4, padding: 28, position: "sticky", top: 90 }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 400, marginBottom: 24 }}>Order Summary</h2>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#8a8278", fontSize: "0.9rem", marginBottom: 12 }}>
              <span>Subtotal ({totalItems} items)</span><span style={{ color: "#e8e4dc" }}>${totalPrice}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#8a8278", fontSize: "0.9rem", marginBottom: 20 }}>
              <span>Shipping</span><span style={{ color: "#2ecc71" }}>Calculated at checkout</span>
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #2e2e2e", margin: "20px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.15rem" }}>Total</span>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", color: "#c9a84c" }}>${totalPrice}</span>
            </div>
            <button onClick={() => navigate("/shipping")} style={{
              width: "100%", padding: 15, background: "#c9a84c", color: "#0f0f0f",
              border: "none", borderRadius: 4, fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.12em",
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
            }}>Proceed to Checkout</button>
            <Link to="/" style={{ display: "block", textAlign: "center", color: "#8a8278", fontSize: "0.8rem", marginTop: 16, letterSpacing: "0.06em" }}>Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
