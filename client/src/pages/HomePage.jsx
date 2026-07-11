import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createWorkspace } from "../api/workspaceApi";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workspaceName, setWorkspaceName] = useState("");

  const handleCreateWorkspace = async () => {
    try {
      const data = await createWorkspace({
        name: workspaceName,
        type: "COLLABORATION",
      });

      navigate(`/workspace/${data.workspace._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>
        Welcome
        {user?.name}
      </h2>
      <div>
        <input
          type="text"
          placeholder="Workspace Name"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />

        <br />
        <br />

        <button onClick={handleCreateWorkspace}>Create Workspace</button>
      </div>
    </div>
  );
}

export default HomePage;
