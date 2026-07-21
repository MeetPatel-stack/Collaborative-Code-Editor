import { BrowserRouter, Routes, Route } from "react-router-dom";


import WorkspacePage from "./pages/WorkspacePage";
// import LoginPage from "./pages/LoginPage";
// import JoinWorkspacePage from "./pages/JoinWorkspacePage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}

        <Route path="/workspace/:workspaceId" element={<WorkspacePage />} />

        {/* <Route path="/join" element={<JoinWorkspacePage />} />
         */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
