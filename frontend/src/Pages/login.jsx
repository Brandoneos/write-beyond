// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
  // Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Register state
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);



  // === LOGIN ===
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      console.log("Past login");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // === REGISTER ===
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Call register API
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: regUsername, password: regPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // 2. Auto-login after register
      // await login(regUsername, regPassword);

      // 3. Go home
      // navigate("/");
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
      {/* === LOGIN FORM === */}
      <form onSubmit={handleLogin} style={{ marginBottom: 30 }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={btnStyle}>Login</button>
      </form>

      {/* === REGISTER FORM === */}
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={regUsername}
          onChange={(e) => setRegUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={btnStyle}>Register</button>
      </form>

      {/* Shared error */}
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      {/* Optional: Debug button */}
      {/* <button onClick={() => navigate("/")}>Go Home (Bypass)</button> */}
    </div>
  );
}

// Simple styles
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "0.5rem",
  margin: "0.5rem 0",
  fontSize: "1rem",
};

const btnStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  marginTop: "0.5rem",
};