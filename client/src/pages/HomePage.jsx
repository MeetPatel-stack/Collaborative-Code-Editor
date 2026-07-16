import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createWorkspace } from "../api/workspaceApi";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workspaceName, setWorkspaceName] = useState("");
  const [password, setPassword] = useState("");

  const [type, setType] = useState("COLLABORATION");
  const handleCreateWorkspace = async () => {
    try {
      const data = await createWorkspace({
        name: workspaceName,

        password,

        type,
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
        <input
          type="password"
          placeholder="Workspace Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="COLLABORATION">Collaboration</option>

          <option value="CLASSROOM">Classroom</option>
        </select>

        <br />
        <br />

        <button onClick={handleCreateWorkspace}>Create Workspace</button>
        <br />
        <br />
        <button onClick={() => navigate("/join")}>Join Workspace</button>
      </div>
    </div>
  );
}

export default HomePage;
