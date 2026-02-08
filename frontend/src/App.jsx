import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TokenPage from "./pages/TokenPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/token" element={<TokenPage />} />
      </Routes>
    </BrowserRouter>
  );
}
