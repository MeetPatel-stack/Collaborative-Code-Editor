import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f8fc",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          borderRadius: "16px",
          padding: "50px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          CodeCollab
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "40px",
          }}
        >
          Real-time collaborative coding platform for teams,
          classrooms and coding interviews.
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "15px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Continue with Google
        </button>

        <div
          style={{
            marginTop: "40px",
            color: "#888",
            fontSize: "14px",
          }}
        >
          Create workspaces • Collaborate • Conduct coding exams
        </div>
      </div>
    </div>
  );
}

export default LandingPage;