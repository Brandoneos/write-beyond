// src/components/Sidebar/Sidebar.jsx
import React from "react";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Write Beyond</div>
      <nav className="sidebar-nav">
        <a href="/">Home</a>
        <a href="/board">Board</a>
        <a href="/files">Files</a>
        <a href="/settings">Settings</a>
      </nav>
      <div className="sidebar-footer">
        <button>Logout</button>
      </div>
    </div>
  );
}
