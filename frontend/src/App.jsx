import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/login.jsx";
import GoodbyePage from "./Pages/GoodbyePage.jsx";
import HomePage from "./Pages/home.jsx";
import Layout from "./Components/Layout.jsx";
import "./App.css";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/goodbye" element={<GoodbyePage />} />
          <Route path="/" element={<HomePage />} />
        </Route>

      </Routes>
    </Router>
  );
};

// comment
export default App;
