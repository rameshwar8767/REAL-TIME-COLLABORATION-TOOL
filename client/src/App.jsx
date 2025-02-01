import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import RequireAuth from './outlet/RequiredAuth';
function App() {
  return (
    <div className=" bg-gradient-to-r from-gray-800 via-gray-900 to-black  min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Editor/:roomId" element={<EditorPage />} />
       </Route>
      </Routes>
    </div>
  );
}

export default App;
