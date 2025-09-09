import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/login.jsx";
import GoodbyePage from "./Pages/GoodbyePage.jsx";
import HomePage from "./Pages/home.jsx";
import Layout from "./Components/Layout.jsx";
import "./App.css";
import "./index.css";
import NewFilePage from "./Pages/NewFilePage.jsx";
import FilesPage from "./Pages/FilesPage.jsx";
import EditFilePage from "./Pages/EditFilePage.jsx";
import RequireAuth from "./Components/RequireAuth";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/goodbye" element={<GoodbyePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/new-file" element={<NewFilePage />} />
            <Route path="/edit-file" element={<EditFilePage />} />
            <Route path="/files" element={<FilesPage />} />
          </Route>
        </Route>


      </Routes>
    </Router>
  );
};

// comment
export default App;
