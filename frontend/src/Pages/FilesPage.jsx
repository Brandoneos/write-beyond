import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      setFiles([]);
      return;
    }
  
    const loadFiles = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/files", {
          method: "GET",
          headers: {
            "User-Id": user.id.toString(),   // ← This sends the ID
            "Content-Type": "application/json"
          }
        });
  
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
  
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error("Failed to load files:", err);
        setFiles([]);
      }
    };
  
    loadFiles();
  }, [user?.id]);


  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/files/${fileId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete file");
      setFiles(files.filter(f => f.id !== fileId));
    } catch (err) {
      console.error("Error deleting file:", err);
      alert("Could not delete the file. Try again.");
    }
  };

  return (
    <div style={{ paddingTop: "20px", paddingLeft: "320px" }}>
      <h1>Files</h1>
      <button onClick={() => navigate("/new-file")}>New File</button>
      <hr style={{ marginTop: "20px", marginBottom: "20px", marginRight: "20px", border: "2px solid #030000ff" }} />

      {files.length === 0 ? (
        <p>No files yet. Create one!</p>
      ) : (
        // Sort files first
        [...files]
          .sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified)) // newest first
          .map((file) => (
            <div
              key={file.id}
              style={{ display: "flex", alignItems: "center", margin: "10px 0", gap: "10px" }}
            >
              <button
                onClick={() => navigate("/edit-file", { state: { file } })}
                style={{ cursor: "pointer" }}
              >
                {file.name}
              </button>
              <button
                onClick={() => handleDelete(file.id)}
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
                title="Delete file"
              >
                🗑️
              </button>
            </div>
          ))
      )}
    </div>
  );
};

export default FilesPage;
