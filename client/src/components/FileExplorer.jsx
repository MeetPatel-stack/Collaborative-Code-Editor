import { createRoomDocument } from "../api/roomApi";
import { useEffect, useState } from "react";

function FileExplorer({
  room,
  roomId,
  documents,
  activeDocument,
  onSelect,
  refreshDocuments,
  onDocumentCreated,
}) {
  const [showInput, setShowInput] = useState(false);
  const [fileName, setFileName] = useState("");

  const detectLanguage = (filename) => {
    const ext = filename.split(".").pop();

    const map = {
      js: "javascript",
      py: "python",
      cpp: "cpp",
      c: "c",
      java: "java",
      go: "go",
      rs: "rust",
      ts: "typescript",
      html: "html",
      css: "css",
    };

    return map[ext] || "plaintext";
  };

  const handleCreateFile = async () => {
    if (!fileName.trim()) return;

    try {
      const language = detectLanguage(fileName);

      const response = await createRoomDocument(roomId, {
        title: fileName,
        language,
      });

      const newDocument = response.document;

      setFileName("");
      setShowInput(false);

      await refreshDocuments();
      await onDocumentCreated(newDocument._id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <h3>Files</h3>
      <button onClick={() => setShowInput(true)}>+ New File</button>
      {showInput && (
        <input
          autoFocus
          value={fileName}
          placeholder="example.py"
          onChange={(e) => setFileName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateFile();
            }

            if (e.key === "Escape") {
              setShowInput(false);
              setFileName("");
            }
          }}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "8px",
            boxSizing: "border-box",
          }}
        />
      )}

      {documents.map((doc) => (
        <div
          key={doc._id}
          onClick={() => onSelect(doc._id)}
          style={{
            padding: "10px",
            cursor: "pointer",
            marginBottom: "5px",
            backgroundColor:
              activeDocument?._id === doc._id ? "#e5e5e5" : "transparent",
          }}
        >
          {doc.title}
        </div>
      ))}
    </div>
  );
}

export default FileExplorer;
