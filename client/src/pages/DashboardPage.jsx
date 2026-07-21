import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyWorkspaces,
  joinWorkspace,
  createWorkspace,
} from "../api/workspaceApi";

import WorkspaceCard from "../components/WorkspaceCard";
import CreateWorkspaceModal from "../components/CreateWorkspaceModal";

import JoinWorkspaceModal from "../components/JoinWorkspaceModal";

function DashboardPage() {
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const res = await getMyWorkspaces();

      setWorkspaces(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async (payload) => {
    try {
      const res = await createWorkspace(payload);

      // console.log(res.data.workspace)
      navigate(`/workspace/${res.workspace._id}`);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message);
    }
  };

  const handleJoin = async (payload) => {
    try {
      const res = await joinWorkspace(payload);

      navigate(`/workspace/${res.data.workspace._id}`);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
      }}
    >
      <h1>CodeCollab</h1>

      <p>Welcome back 👋</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <button onClick={() => setShowCreate(true)}>+ Create Workspace</button>

        <button onClick={() => setShowJoin(true)}>+ Join Workspace</button>
      </div>

      <h2>My Workspaces</h2>

      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace._id} workspace={workspace} />
      ))}

      <CreateWorkspaceModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />

      <JoinWorkspaceModal
        open={showJoin}
        onClose={() => setShowJoin(false)}
        onJoin={handleJoin}
      />

      
    </div>
  );
}

export default DashboardPage;
