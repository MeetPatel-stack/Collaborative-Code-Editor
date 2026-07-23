import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket/socket";
import FileExplorer from "../components/FileExplorer";
import EditorPanel from "../components/EditorPanel";

import { getWorkspaceDocuments, getWorkspace } from "../api/workspaceApi";
import { getDocument, updateDocument } from "../api/documentApi";
import { getPresence } from "../api/presenceApi";
function WorkspacePage() {
  const { workspaceId } = useParams();

  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [room, setRoom] = useState(null);
  //const [members, setMembers] = useState([]);

  const [presence, setPresence] = useState([]);
  const isRemoteChange = useRef(false);
  const editingTimeout = useRef(null);
  // to emit the events user is required
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDocuments = async (selectFirst = false) => {
    try {
      const data = await getWorkspaceDocuments(workspaceId);

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
      const data = await getWorkspace(workspaceId);

      console.log("API Response:", data);

      setRoom(data.workspace);
      console.log("After setRoom");
    } catch (error) {
      console.error(error);
    }
  };

  const loadDocument = async (documentId) => {
    try {
      const document = await getDocument(documentId);

      setActiveDocument(document);
      socket.emit("document-opened", {
        workspaceId,
        userId: user._id,
        documentId: document._id,
        documentTitle: document.title,
      });

      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode) => {
    const updatedCode = newCode || "";

    socket.emit("editing-started", {
      workspaceId,
      userId: user._id,
    });

    clearTimeout(editingTimeout.current);

    editingTimeout.current = setTimeout(() => {
      socket.emit("editing-stopped", {
        workspaceId,
        userId: user._id,
      });
    }, 3000);

    setActiveDocument((prev) => ({
      ...prev,
      code: updatedCode,
    }));

    if (isRemoteChange.current) {
      isRemoteChange.current = false;
    }

    if (!isRemoteChange.current && activeDocument) {
      socket.emit("code-change", {
        workspaceId,
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

  // const loadMembers = async () => {
  //   const data = await getMembers(workspaceId);

  //   setMembers(data.data);
  // };

  // useEffect(() => {
  //   loadMembers();
  // }, []);

  const loadPresence = async () => {
    const data = await getPresence(workspaceId);

    setPresence(data.data);
  };

  useEffect(() => {
    fetchRoom();
    console.log(room);
    fetchDocuments(true);
  }, [workspaceId]);

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

    const user = JSON.parse(localStorage.getItem("user"));

    socket.emit("join-workspace", {
      workspaceId,
      userId: user._id,
    });

    return () => {
      socket.disconnect();
    };
  }, [workspaceId]);

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

  useEffect(() => {
    socket.on("file-created", (newDocument) => {
      setDocuments((prev) => [...prev, newDocument]);
    });

    return () => {
      socket.off("file-created");
    };
  }, []);

  useEffect(() => {
    const handlePresenceUpdate = () => {
      loadPresence();
    };

    socket.on("presence-updated", handlePresenceUpdate);

    return () => {
      socket.off("presence-updated", handlePresenceUpdate);
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}

      <div
        style={{
          height: "60px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <h3>{room?.name}</h3>

        <div>
          Join Code : <strong>{room?.joinCode}</strong>
        </div>
      </div>

      {/* Main Layout */}

      <div
        style={{
          flex: 1,
          display: "flex",
        }}
      >
        {/* File Explorer */}

        <FileExplorer
          room={room}
          workspaceId={workspaceId}
          documents={documents}
          activeDocument={activeDocument}
          onSelect={loadDocument}
          refreshDocuments={fetchDocuments}
          onDocumentCreated={loadDocument}
          setActiveDocument={setActiveDocument}
        />

        {/* Editor */}

        <EditorPanel
          activeDocument={activeDocument}
          loading={loading}
          onCodeChange={handleCodeChange}
          saveStatus={saveStatus}
        />

        {/* Members Panel */}

        <div
          style={{
            width: "250px",
            borderLeft: "1px solid #ddd",
            padding: "15px",
            overflowY: "auto",
          }}
        >
          <h3>Members</h3>

          {presence.map((member) => {
            if (!member.userId) return null;

            return (
              <div key={member._id}>
                <strong>{member.userId.name}</strong>
                <br />
                {member.status === "ONLINE" ? "🟢 Online" : "⚪ Offline"}
                <br />
                Activity : {member.activity}
                <br />
                {member.currentDocumentTitle && (
                  <>📄 {member.currentDocumentTitle}</>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WorkspacePage;
