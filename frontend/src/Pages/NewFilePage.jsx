import { useNavigate } from "react-router-dom";

const NewFilePage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ paddingTop: "20px", paddingLeft: "320px" }}>
            <h1>New File</h1>
            <button onClick={() => navigate(-1)}>Back</button>
            {/* Add your new file creation UI here */}
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
                placeholder="Start typing anywhere..."
            />
        </div>

    );
};

export default NewFilePage;
