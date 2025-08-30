import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchGoodbye = async () => {
    try {
      const res = await fetch("http://localhost:8080/goodbye");
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      console.error("Error fetching API:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <button onClick={fetchGoodbye}>Goodbye from Home Page API</button>
      <button onClick={() => navigate("/goodbye")}>Go to Goodbye Page</button>
      <button onClick={() => navigate("/login")}>Logout</button>
      <p>{message}</p>
    </div>
  );
};

export default HomePage;
