import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/");
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      console.error("Error fetching API:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Screen</h1>
      <button onClick={() => navigate("/")}>Login (Direct to Home)</button>
      {/* <button onClick={fetchLogin}>Login Api fetch</button>
      <button onClick={() => navigate("/goodbye")}>Go to Goodbye Page</button> */}
      <p>{message}</p>
    </div>
  );
};

export default Login;
