import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/files");
        if (!res.ok) throw new Error("Failed to fetch files");
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error("Error fetching files:", err);
        setFiles([]); // fallback to empty
      }
    };

    loadFiles();
  }, []);

  return (
    <div style={{ paddingTop: "20px", paddingLeft: "320px" }}>
      <h1>Files</h1>
      <button onClick={() => navigate("/new-file")}>New File</button>
      {files.length === 0 ? (
        <p>No files yet. Create one!</p>
      ) : (
        files.map((file) => (
          <div key={file.id} style={{ margin: "10px 0" }}>
            {file.name}
          </div>
        ))
      )}
    </div>
  );
};

export default FilesPage;
