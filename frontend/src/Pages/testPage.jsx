import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const { user } = useAuth();

  const PAGE_SIZE = 25;

  // -----------------------------------------------------------------
  // Load a single page (replaces old loadFiles)
  // -----------------------------------------------------------------
  const loadPage = async (pageNum) => {
    if (!user?.id || loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/files?page=${pageNum}&size=${PAGE_SIZE}`,
        {
          method: "GET",
          headers: {
            "User-Id": user.id.toString(),
            // "Content-Type" not needed for GET
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json(); // Spring Page response

      setFiles((prev) => [...prev, ...data.content]);
      setHasMore(!data.last);
      setPage(pageNum + 1);
    } catch (err) {
      console.error("Failed to load files:", err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------------------------------
  // Initial load + dependency on user.id
  // -----------------------------------------------------------------
  useEffect(() => {
    if (!user?.id) {
      setFiles([]);
      setPage(0);
      setHasMore(true);
      return;
    }

    // Reset and load first page
    setFiles([]);
    setPage(0);
    setHasMore(true);
    loadPage(0);
  }, [user?.id]);

  // -----------------------------------------------------------------
  // Load More handler
  // -----------------------------------------------------------------
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadPage(page);
    }
  };

  // -----------------------------------------------------------------
  // Delete (unchanged)
  // -----------------------------------------------------------------
  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/files/${fileId}`, {
        method: "DELETE",
        headers: { "User-Id": user.id.toString() },
      });
      if (!res.ok) throw new Error("Failed to delete file");
      setFiles(files.filter((f) => f.id !== fileId));
    } catch (err) {
      console.error("Error deleting file:", err);
      alert("Could not delete the file. Try again.");
    }
  };

  // -----------------------------------------------------------------
  // Render (unchanged layout + Load More)
  // -----------------------------------------------------------------
  return (
    <div style={{ paddingTop: "20px", paddingLeft: "320px" }}>
      <h1>Files</h1>
      <button onClick={() => navigate("/new-file")}>New File</button>
      <hr
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          marginRight: "20px",
          border: "2px solid #030000ff",
        }}
      />

      {files.length === 0 && !loading ? (
        <p>No files yet. Create one!</p>
      ) : (
        <>
          {/* Sorted list */}
          {[...files]
            .sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified))
            .map((file) => (
              <div
                key={file.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => navigate("/edit-file", { state: { file } })}
                  style={{ cursor: "pointer" }}
                >
                  {file.name}
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title="Delete file"
                >
                  Trash
                </button>
              </div>
            ))}

          {/* Load More Button */}
          {hasMore && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={handleLoadMore}
                disabled={loading}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilesPage;