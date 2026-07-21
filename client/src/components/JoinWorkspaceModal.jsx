import { useState } from "react";

function JoinWorkspaceModal({ open, onClose, onJoin }) {
  const [joinCode, setJoinCode] = useState("");

  const [password, setPassword] = useState("");

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
        }}
      >
        <h2>Join Workspace</h2>

        <input
          placeholder="Join Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Workspace Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={() =>
              onJoin({
                joinCode,
                password,
              })
            }
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinWorkspaceModal;
