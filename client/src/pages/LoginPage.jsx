function LoginPage() {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>CodeCollab</h1>

      <button
        onClick={loginWithGoogle}
        style={{
          padding: "15px 25px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}

export default LoginPage;