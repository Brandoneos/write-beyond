import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";
// import App from "../App";

import { useAuth } from "../context/AuthContext";


const HomePage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const fetchGoodbye = async () => {
    try {
      const res = await fetch("http://localhost:8080/goodbye");
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      console.error("Error fetching API:", err);
    }
  };

  const handleLogout = () => {
    logout();                    // ← CLEARS user + localStorage
    navigate("/login");          // ← THEN go to login
  };

  return (
    <div style={{ paddingTop: "20px", paddingLeft: "320px" }}>
      <h1>Home Page (User: {user.username})</h1>
      <button onClick={fetchGoodbye}>Goodbye from Home Page API</button>
      <button onClick={() => navigate("/goodbye")}>Go to Goodbye Page</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/new-file")}>Make New File</button>
      <button onClick={() => navigate("/files")}>Files</button>
      <p>{message}</p>
    </div>
  );
};

export default HomePage;
