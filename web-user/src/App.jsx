import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RequestAccountCodePage from "./pages/RequestAccountCodePage";
import CreateEventPage from "./pages/CreateEventPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import HomePage from "./pages/HomePage";
import AuthProvider from "./context/AuthContext";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/request-account-code"
            element={<RequestAccountCodePage />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="/analytics" element={<Analytics/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
