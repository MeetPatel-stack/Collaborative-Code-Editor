import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createRoom } from "../api/roomApi";

function HomePage() {
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState("");

  const handleCreateWorkspace = async () => {
    try {
      const data = await createRoom({
        name: workspaceName,
      });

      navigate(`/workspace/${data.room._id}`);
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
