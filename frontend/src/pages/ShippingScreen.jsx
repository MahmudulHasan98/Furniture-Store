import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const steps = ["Cart", "Shipping", "Payment"];

const ShippingScreen = () => {
  const { shippingAddress, saveShippingAddress } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate("/placeorder");
  };

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5vw" }}>
      <div className="fade-up" style={{ width: "100%", maxWidth: 500 }}>

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 48 }}>
          {steps.map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: i === 1 ? "#c9a84c" : i < 1 ? "#2ecc71" : "#2e2e2e",
                  color: i === 1 ? "#0f0f0f" : i < 1 ? "#0f0f0f" : "#8a8278",
                  fontSize: "0.8rem", fontWeight: 600,
                }}>{i < 1 ? "✓" : i + 1}</div>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: i === 1 ? "#c9a84c" : "#8a8278" }}>{step}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: 60, height: 1, background: i < 1 ? "#2ecc71" : "#2e2e2e", margin: "0 12px", marginBottom: 22 }}/>}
            </div>
          ))}
        </div>

        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.2rem", fontWeight: 400, textAlign: "center", marginBottom: 32 }}>Shipping Details</h1>

        <div style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 4, padding: "36px 32px" }}>
          <form onSubmit={submitHandler}>
            <div style={{ marginBottom: 20 }}>
              <label className="label">Street Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className="input-field" placeholder="123 Main Street" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <label className="label">City</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="input-field" placeholder="New York" />
              </div>
              <div>
                <label className="label">Postal Code</label>
                <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} required className="input-field" placeholder="10001" />
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label className="label">Country</label>
              <input type="text" value={country} onChange={e => setCountry(e.target.value)} required className="input-field" placeholder="United States" />
            </div>
            <button type="submit" style={{
              width: "100%", padding: 14, background: "#c9a84c", color: "#0f0f0f",
              border: "none", borderRadius: 4, fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.12em",
              textTransform: "uppercase", cursor: "pointer",
            }}>Continue to Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
