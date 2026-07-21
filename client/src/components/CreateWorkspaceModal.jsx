import { useState } from "react";

function CreateWorkspaceModal({
  open,
  onClose,
  onCreate,
}) {
  const [name, setName] = useState("");

  const [password, setPassword] =
    useState("");

  const [type, setType] = useState(
    "COLLABORATION"
  );

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
          background: "white",
          borderRadius: "12px",
          padding: "25px",
        }}
      >
        <h2>Create Workspace</h2>

        <input
          placeholder="Workspace Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            marginBottom: "15px",
          }}
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          style={{
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <option value="COLLABORATION">
            Collaboration
          </option>

          <option value="CLASSROOM">
            Classroom
          </option>
        </select>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
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
          <button onClick={onClose}>
            Cancel
          </button>

          <button
            onClick={() =>
              onCreate({
                name,
                type,
                password,
              })
            }
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspaceModal;