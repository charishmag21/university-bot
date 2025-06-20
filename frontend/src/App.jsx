import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import HomePage from "./components/HomePage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import "./style.css";

function MainApp({ darkMode, setDarkMode }) {
  const [university, setUniversity] = useState("");
  const [campus, setCampus] = useState("");
  const [sessionId] = useState("frontend-user-123");

  return (
    <div className={`main-layout${darkMode ? " dark" : ""}`}>
      <Sidebar
        university={university}
        setUniversity={setUniversity}
        campus={campus}
        setCampus={setCampus}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Chat
        university={university}
        campus={campus}
        sessionId={sessionId}
        darkMode={darkMode}
      />
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onStart={() => (window.location.href = "/app")}
              // If you want to route programmatically, you could use useNavigate in HomePage
            />
          }
        />
        <Route
          path="/app"
          element={<MainApp darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
