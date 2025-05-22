import React, { useState, useRef, useEffect } from "react";
import "./style.css";

function splitPoints(text) {
  // Splits text into bullet/numbered points (works for most formatted LLM outputs)
  const points = text.split(/\s*(?:\d+\.\s+|•\s+|- )/).filter(Boolean);
  return points.length > 1 ? points : [text];
}

const BOT_NAME = "UniBot";
const USER_NAME = "You";

export default function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: BOT_NAME,
      text: "Hi! Ask me anything about universities. 😊",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Auto-scroll to bottom when new message
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Handle sending a message
  const handleAsk = async () => {
    if (!query.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: USER_NAME, text: query, isBot: false },
    ]);
    setLoading(true);
    setQuery("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, session_id: "frontend-user-123" }),
      });
      const data = await res.json();
      // Split response into points (as bullet points)
      const points = splitPoints(data.summary || "");
      setMessages((prev) => [
        ...prev,
        {
          sender: BOT_NAME,
          text: points,
          isBot: true,
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: BOT_NAME,
          text: ["❌ Failed to fetch response from backend."],
          isBot: true,
        },
      ]);
    }
    setLoading(false);
  };

  // Send message on Enter (not Shift+Enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
  <div className="container">
    {/* Header: Logo and Title */}
    <div className="header">
      <img src="/NEU logo.png" alt="Northeastern Logo" className="neu-logo"/>
      <div>
        <h1>University Chatbot</h1>
        <p className="subtitle">Powered by Northeastern AI</p>
      </div>
    </div>

    {/* Chat Area */}
    <div className="chat-box" ref={chatRef}>
      {messages.map((msg, idx) => (
        <div key={idx} className={`chat-bubble ${msg.isBot ? "bot" : "user"}`}>
          <span className="chat-sender">{msg.sender}:</span>
          {Array.isArray(msg.text) ? (
            <ul>
              {msg.text.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          ) : (
            <span>{msg.text}</span>
          )}
          {msg.sources && msg.sources.length > 0 && (
            <div className="sources">
              <b>Sources:</b>
              <ul>
                {msg.sources.map((s, i) => (
                  <li key={i}>
                    <a href={s.link} target="_blank" rel="noopener noreferrer">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      {loading && (
        <div className="chat-bubble bot loading">UniBot is thinking...</div>
      )}
    </div>

    {/* Input Area */}
    <div className="input-row">
      <textarea
        rows={2}
        value={query}
        placeholder="Type your message and press Enter..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAsk} disabled={loading || !query.trim()}>
        {loading ? "..." : "Send"}
      </button>
    </div>
  </div>
);
}
