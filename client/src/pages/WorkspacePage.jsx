import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket/socket";
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

  const isRemoteChange = useRef(false);

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
    const updatedCode = newCode || "";

    setActiveDocument((prev) => ({
      ...prev,
      code: updatedCode,
    }));

    if (isRemoteChange.current) {
      isRemoteChange.current = false;
    }

    if (!isRemoteChange.current && activeDocument) {
      socket.emit("code-change", {
        roomId,
        documentId: activeDocument._id,
        code: updatedCode,
      });
    }
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

  useEffect(() => {
    socket.connect();

    socket.emit("join-room", roomId);

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("receive-change", ({ documentId, code }) => {
      if (!activeDocument || activeDocument._id !== documentId) {
        return;
      }

      isRemoteChange.current = true;

      setActiveDocument((prev) => ({
        ...prev,
        code,
      }));
    });

    return () => {
      socket.off("receive-change");
    };
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
