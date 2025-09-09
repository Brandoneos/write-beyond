import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");   // add state for username
  const [password, setPassword] = useState("");   // add state for password
  const navigate = useNavigate();

  // const fetchLogin = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8080/");
  //     const text = await res.text();
  //     setMessage(text);
  //   } catch (err) {
  //     console.error("Error fetching API:", err);
  //   }
  // };

  const handleLogin = () => {
    // Hardcoded credentials
    const correctUsername = "username";
    const correctPassword = "password";

    if (username === correctUsername && password === correctPassword) {
      console.log("Login successful!");
      localStorage.setItem("jwt", "dummy-token");
      navigate("/"); // go to home page
    } else {
      console.log("Login failed!");
      alert("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Screen</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      {/* <button onClick={fetchLogin}>Login Api fetch</button>
      <button onClick={() => navigate("/goodbye")}>Go to Goodbye Page</button> */}

      <p>{message}</p>
    </div>
  );
};

export default Login;
