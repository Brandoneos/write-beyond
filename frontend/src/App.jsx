import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/login.jsx";
import GoodbyePage from "./Pages/GoodbyePage.jsx";
import HomePage from "./Pages/home.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/goodbye" element={<GoodbyePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};
// comment
export default App;
