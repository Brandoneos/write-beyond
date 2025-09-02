import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewFilePage = () => {
    
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [title, setTitle] = useState("New File");

    const handleBack = async () => {
        if (content.trim() !== "" || title !== "New File") {
            console.log("File is not empty");
            try {
                await fetch(`http://localhost:8080/api/files`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: title,
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
        <div style={{ paddingTop: "20px", paddingLeft: "320px", paddingRight: "20px" }}>
            <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New File"
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
                    style={{
                        padding: "8px 16px",
                        borderRadius: "6px",
                        backgroundColor: "#e5e5e5",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Back
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

export default NewFilePage;

