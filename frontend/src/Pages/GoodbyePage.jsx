import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoodbyePage = () => {
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
    <div style={{ padding: "400px" }}>
      <h1>Goodbye Page</h1>
      <button onClick={fetchGoodbye}>Goodbye API</button>
      <button onClick={() => navigate("/")}>Go to Home Page</button>
      <p>{message}</p>
    </div>
  );
};

export default GoodbyePage;
