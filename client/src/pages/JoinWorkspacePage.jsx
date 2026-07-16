import { useState } from "react";
import { joinWorkspace } from "../api/workspaceApi";
import { useNavigate } from "react-router-dom";

function JoinWorkspacePage() {
  const [joinCode, setJoinCode] = useState("");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleJoin = async () => {
    try {
      const data = await joinWorkspace({
        joinCode,
        password,
      });

      navigate(`/workspace/${data.data.workspace._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to join workspace");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h2>Join Workspace</h2>

        <input
          placeholder="Join Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
}

export default JoinWorkspacePage;
