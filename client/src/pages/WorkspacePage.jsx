import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FileExplorer from "../components/FileExplorer";
import EditorPanel from "../components/EditorPanel";

import { getRoomDocuments, getRoom } from "../api/roomApi";
import { getDocument, updateDocument } from "../api/documentApi";

function WorkspacePage() {
  const { roomId } = useParams();

  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [room, setRoom] = useState(null);

  const fetchDocuments = async (selectFirst = false) => {
    try {
      const data = await getRoomDocuments(roomId);

      setDocuments(data.documents);

      if (selectFirst && data.documents.length > 0) {
        loadDocument(data.documents[0]._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoom = async () => {
    try {
      const data = await getRoom(roomId);

      setRoom(data.room);
    } catch (error) {
      console.error(error);
    }
  };

  const loadDocument = async (documentId) => {
    try {
      const document = await getDocument(documentId);

      setActiveDocument(document);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode) => {
    setActiveDocument((prev) => ({
      ...prev,
      code: newCode || "",
    }));
  };

  const saveDocumentChanges = async () => {
    if (!activeDocument) return;

    try {
      setSaveStatus("Saving...");

      await updateDocument(activeDocument._id, {
        title: activeDocument.title,
        language: activeDocument.language,
        code: activeDocument.code,
      });

      setSaveStatus("Saved");
    } catch (error) {
      console.error(error);

      setSaveStatus("Error");
    }
  };

  useEffect(() => {
    fetchRoom();
    fetchDocuments(true);
  }, [roomId]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!activeDocument) return;

    const timer = setTimeout(() => {
      saveDocumentChanges();
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeDocument]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <FileExplorer
        room={room}
        roomId={roomId}
        documents={documents}
        activeDocument={activeDocument}
        onSelect={loadDocument}
        refreshDocuments={fetchDocuments}
        onDocumentCreated={loadDocument}
        setActiveDocument={setActiveDocument}
      />

      <EditorPanel
        activeDocument={activeDocument}
        loading={loading}
        onCodeChange={handleCodeChange}
        saveStatus={saveStatus}
      />
    </div>
  );
}

export default WorkspacePage;
