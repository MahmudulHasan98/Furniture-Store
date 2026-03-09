import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51T8D4nAikxtrnry6HJoQtwDnljaxw5rS8TQsGzQ6LIzlPydXpWhvhq8o8dRhGdVqDyiAVyHqaER6aUfKwjhWsDwn00KZkF4zwF");

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress } = useCart();
  const { userInfo } = useAuth();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  const handlePaymentSuccess = async (paymentId) => {
    try {
      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${userInfo.token}` } };
      await axios.post("/api/orders", {
        orderItems: cartItems, shippingAddress, totalPrice,
        paymentResult: { id: paymentId, status: "succeeded" },
      }, config);
      alert("Payment Successful & Order Placed!");
      localStorage.removeItem("cartItems");
      window.location.href = "/profile";
    } catch (error) {
      alert(error.response?.data?.message || "Order saving failed");
    }
  };

  return (
    <div className="page fade-up">
      <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.4rem", fontWeight: 400, marginBottom: 40 }}>Order Summary</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Shipping */}
          <div style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 4, padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 400 }}>Shipping Address</h2>
            </div>
            <p style={{ color: "#8a8278", lineHeight: 1.8 }}>
              {shippingAddress.address}, {shippingAddress.city}<br />
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Items */}
          <div style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 4, padding: "24px 28px" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 400, marginBottom: 20 }}>Order Items</h2>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #242424" }}>
                <img src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 4, border: "1px solid #2e2e2e" }} />
                <span style={{ flex: 1, fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}>{item.name}</span>
                <span style={{ color: "#8a8278", fontSize: "0.9rem" }}>{item.qty} × ${item.price}</span>
                <span style={{ color: "#c9a84c", fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", minWidth: 60, textAlign: "right" }}>${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Payment */}
        <div style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 4, padding: "28px", position: "sticky", top: 90 }}>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", fontWeight: 400, marginBottom: 20 }}>Order Total</h2>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#8a8278", marginBottom: 12 }}>
            <span>Items</span><span style={{ color: "#e8e4dc" }}>${totalPrice}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#8a8278", marginBottom: 20 }}>
            <span>Shipping</span><span style={{ color: "#2ecc71" }}>Included</span>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #2e2e2e", margin: "0 0 20px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem" }}>Total</span>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", color: "#c9a84c" }}>${totalPrice}</span>
          </div>

          <div style={{ background: "#242424", borderRadius: 4, padding: 20, marginBottom: 12 }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8278", marginBottom: 16 }}>Pay with Card</p>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={totalPrice} onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8a8278", fontSize: "0.75rem" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Secure payment processed by Stripe
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
