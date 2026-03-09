import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

axios.defaults.baseURL = "https://furniture-store-uvvx.onrender.com";

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.post(
        "/api/payment/process",
        { amount },
        config,
      );
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: userInfo.name },
        },
      });
      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess(result.paymentIntent.id);
      }
    } catch (error) {
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          background: "#1a1a1a",
          border: "1px solid #2e2e2e",
          borderRadius: 4,
          padding: "14px 16px",
          marginBottom: 16,
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "15px",
                color: "#e8e4dc",
                fontFamily: "DM Sans, sans-serif",
                "::placeholder": { color: "#8a8278" },
              },
              invalid: { color: "#c0392b" },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: 4,
          background: loading ? "#8a8278" : "#c9a84c",
          color: "#0f0f0f",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
