import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewFilePage = () => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleBack = async () => {
        if (content.trim() !== "") {
            console.log("File is not empty");
            try {
                await fetch("http://localhost:8080/api/files", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: "Untitled File",
                        content,
                        createdAt: new Date().toISOString(),
                    }),
                });
            } catch (err) {
                console.error("Failed to save file:", err);
            }
        } else {
            console.log("File is empty");
        }

        navigate(-1); // go back
    };

    return (
        <div style={{ paddingTop: "20px", paddingLeft: "320px" }}>
            <h1>New File</h1>
            <button onClick={handleBack}>Back</button>
            <textarea
                style={{
                    width: "100vw",
                    height: "100vh",
                    padding: "20px",
                    boxSizing: "border-box",
                    fontSize: "16px",
                    lineHeight: "1.5",
                    border: "none",
                    outline: "none",
                    resize: "none",
                }}
                placeholder="Start typing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <br />

        </div>
    );
};

export default NewFilePage;

