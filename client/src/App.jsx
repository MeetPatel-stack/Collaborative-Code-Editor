import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WorkspacePage from "./pages/WorkspacePage";
import LoginPage from "./pages/LoginPage";
import JoinWorkspacePage from "./pages/JoinWorkspacePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/workspace/:workspaceId" element={<WorkspacePage />} />

        <Route path="/join" element={<JoinWorkspacePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
