import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

axios.defaults.baseURL = "https://furniture-store-uvvx.onrender.com";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAuth();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 5vw",
      }}
    >
      <div className="fade-up" style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "2.6rem",
              fontWeight: 300,
              marginBottom: 8,
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "#8a8278", fontSize: "0.9rem" }}>
            Sign in to your account to continue
          </p>
        </div>

        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #2e2e2e",
            borderRadius: 4,
            padding: "36px 32px",
          }}
        >
          <form onSubmit={submitHandler}>
            <div style={{ marginBottom: 20 }}>
              <label className="label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 14,
                background: loading ? "#8a8278" : "#c9a84c",
                color: "#0f0f0f",
                border: "none",
                borderRadius: 4,
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "#8a8278",
            fontSize: "0.9rem",
          }}
        >
          New customer?{" "}
          <Link
            to="/register"
            style={{ color: "#c9a84c", letterSpacing: "0.03em" }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
