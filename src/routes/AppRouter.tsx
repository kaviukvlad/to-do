import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EventsPage from "../pages/EventsPage";

export const AppRouter = () => {
  const { status } = useContext(AuthContext);

  if (status === "no-authenticated") {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<EventsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
