import React, { useState, useRef, useEffect } from "react";

function splitPoints(text) {
  const points = text
    .split(/\n\s*(?:[*\-•]|\d+\.)\s+/)
    .map(pt => pt.trim())
    .filter(Boolean);
  return points.length > 1 ? points : [text];
}

const BOT_NAME = "UniBot";
const USER_NAME = "You";

export default function Chat({ university, campus, sessionId }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: BOT_NAME,
      text: "Hi! Ask me anything about Canadian universities or colleges. 😊",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async () => {
    if (!query.trim()) return;
    if (!university.trim()) {
      alert("Please enter the university name in the sidebar.");
      return;
    }
    if (!campus.trim()) {
      alert("Please enter or select a campus/city in the sidebar.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { sender: USER_NAME, text: query, isBot: false },
    ]);
    setLoading(true);
    setQuery("");

    try {
    //   const res = await fetch("http://localhost:8000/ask", {
    const res = await fetch("https://university-bot-e4rm.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          university,
          campus,
          session_id: sessionId,
        }),
      });
      const data = await res.json();
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="chat-area">
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
