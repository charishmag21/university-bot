import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import "./style.css";

export default function App() {
  const [university, setUniversity] = useState("");
  const [campus, setCampus] = useState("");
  const [sessionId] = useState("frontend-user-123");
  const [darkMode, setDarkMode] = useState(false);

  // Add a CSS class to the body for dark mode
  React.useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

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
