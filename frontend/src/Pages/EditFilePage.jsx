import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditFilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. DTO from FilesPage (only metadata)
  const fileDto = location.state?.file;
  const fileId = fileDto?.id;

  // 2. UI state
  const [title, setTitle] = useState(fileDto?.title || "");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // -----------------------------------------------------------------
  // 3. Load file content when page opens
  // -----------------------------------------------------------------
  useEffect(() => {
    if (!fileId) {
      navigate("/files");
      return;
    }
    // console.log(fileId);16
    const fetchContent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/files/${fileId}/content`, {
          
        });

        if (!res.ok) throw new Error("Failed to load content");
        const text = await res.text();
        setContent(text);
      } catch (err) {
        console.error(err);
        alert("Could not load file");
        navigate("/files");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [fileId, navigate]);

  // -----------------------------------------------------------------
  // 4. Auto-save on "Back"
  // -----------------------------------------------------------------
  const handleBack = async () => {
    if (!fileId) return;

    setSaving(true);
    try {
      const res = await fetch(`http://localhost:8080/api/files/${fileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "User-Id": localStorage.getItem("userId") || "",
        },
        body: JSON.stringify({
            name: title,
            content,
            updatedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Save failed");
      navigate(-1); // go back
    } catch (err) {
      console.error("Failed to save file:", err);
      alert("Could not save file. Try again.");
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------------------------------------------
  // 5. UI
  // -----------------------------------------------------------------
  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Loading file...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "20px", paddingLeft: "320px", paddingRight: "20px" }}>
      <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="File title"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={handleBack}
          disabled={saving}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            backgroundColor: saving ? "#ccc" : "#e5e5e5",
            border: "none",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving..." : "Back"}
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
        style={{
          marginTop: "20px",
          width: "600px",
          height: "calc(100vh - 200px)",
          padding: "20px",
          fontSize: "16px",
          lineHeight: "1.5",
          border: "1px solid #ccc",
          borderRadius: "6px",
          resize: "none",
          outline: "none",
        }}
      />
    </div>
  );
};

export default EditFilePage;