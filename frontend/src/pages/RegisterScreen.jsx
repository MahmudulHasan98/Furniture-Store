import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAuth();

  useEffect(() => { if (userInfo) navigate("/"); }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { alert("Passwords do not match"); return; }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users", { name, email, password });
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5vw" }}>
      <div className="fade-up" style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.6rem", fontWeight: 300, marginBottom: 8 }}>Create Account</h1>
          <p style={{ color: "#8a8278", fontSize: "0.9rem" }}>Join us and start shopping</p>
        </div>

        <div style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 4, padding: "36px 32px" }}>
          <form onSubmit={submitHandler}>
            {[
              { label: "Full Name", value: name, setter: setName, type: "text", placeholder: "John Doe" },
              { label: "Email Address", value: email, setter: setEmail, type: "email", placeholder: "you@example.com" },
              { label: "Password", value: password, setter: setPassword, type: "password", placeholder: "••••••••" },
              { label: "Confirm Password", value: confirmPassword, setter: setConfirmPassword, type: "password", placeholder: "••••••••" },
            ].map(({ label, value, setter, type, placeholder }) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <label className="label">{label}</label>
                <input type={type} value={value} onChange={e => setter(e.target.value)} required className="input-field" placeholder={placeholder} />
              </div>
            ))}
            <button type="submit" disabled={loading} style={{
              width: "100%", padding: 14, background: loading ? "#8a8278" : "#c9a84c",
              color: "#0f0f0f", border: "none", borderRadius: 4,
              fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
              marginTop: 8,
            }}>{loading ? "Creating..." : "Create Account"}</button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, color: "#8a8278", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#c9a84c" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
