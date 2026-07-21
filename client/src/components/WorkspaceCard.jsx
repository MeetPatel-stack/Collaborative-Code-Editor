import { useNavigate } from "react-router-dom";

function WorkspaceCard({ workspace }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "15px",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
          }}
        >
          {workspace.name}
        </h3>

        <p
          style={{
            color: "#666",
            marginTop: "10px",
            marginBottom: "5px",
          }}
        >
          {workspace.type}
        </p>

        <small>{workspace.joinCode}</small>
      </div>

      <button
        onClick={() =>
          navigate(`/workspace/${workspace._id}`)
        }
      >
        Open
      </button>
    </div>
  );
}

export default WorkspaceCard;