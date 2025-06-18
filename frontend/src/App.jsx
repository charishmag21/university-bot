import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown"; // NEW!
import "./style.css";

function splitPoints(text) {
  // Split on newlines starting with common markdown list indicators
  // Handles *, -, •, and numbered lists, as well as lines that begin with those characters.
  const points = text
    .split(/\n\s*(?:[*\-•]|\d+\.)\s+/)
    .map(pt => pt.trim())
    .filter(Boolean);
  return points.length > 1 ? points : [text];
}

const BOT_NAME = "UniBot";
const USER_NAME = "You";

const allCampuses = [
  // ... your campus list as before ...
  "Athabasca", "Calgary", "Edmonton", "Lethbridge", "Camrose", "Lacombe",
  "Vancouver", "Burnaby", "Surrey", "Richmond", "Langley", "Victoria", "Prince George", "Kamloops", "Nanaimo", "Abbotsford",
  "Winnipeg", "Brandon",
  "Regina", "Saskatoon",
  "Toronto", "Scarborough", "Mississauga", "Brampton", "Kitchener", "Barrie", "Milton", "Thunder Bay",
  "Ottawa", "Waterloo", "London", "Kingston", "Hamilton", "Guelph", "Peterborough", "Oshawa", "North Bay", "St. Catharines", "Sudbury", "Sault Ste. Marie", "Belleville", "Welland", "Cornwall", "Sarnia",
  "Montreal", "Laval", "Quebec City", "Sherbrooke", "Chicoutimi", "Trois-Rivières", "Rimouski", "Gatineau", "Rouyn‑Noranda", "Hull",
  "Fredericton", "Moncton", "Saint John", "Sackville", "Edmundston", "Shippagan",
  "Charlottetown",
  "Halifax", "Wolfville", "Sydney", "Antigonish", "Pointe-de-l’Église",
  "Corner Brook", "St. John's",
  "New Westminster", "Yellowknife", "Fort Smith", "Iqaluit"
];

export default function App() {
  const [university, setUniversity] = useState("");
  const [campusInput, setCampusInput] = useState("");
  const [campusSuggestions, setCampusSuggestions] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState("");
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

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async () => {
    if (!query.trim()) return;
    if (!university.trim()) {
      alert("Please enter the university name.");
      return;
    }
    if (!selectedCampus && !campusInput) {
      alert("Please enter or select a campus/city.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { sender: USER_NAME, text: query, isBot: false },
    ]);
    setLoading(true);
    setQuery("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
      // const res = await fetch("https://university-bot-e4rm.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          university,
          campus: selectedCampus || campusInput,
          session_id: "frontend-user-123"
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
    <div className="container">
      {/* Header */}
      <div className="header">
        <img src="/NEU logo.png" alt="Northeastern Logo" className="neu-logo"/>
        <div>
          <h1>University Chatbot</h1>
          <p className="subtitle">Powered by Northeastern AI</p>
        </div>
      </div>

      {/* Selector for University and Campus/City */}
      <div className="selector-row">
        <input
          type="text"
          placeholder="Enter university name"
          value={university}
          onChange={e => setUniversity(e.target.value)}
          className="uni-input"
        />
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Enter campus or city"
            value={campusInput}
            onChange={e => {
              setCampusInput(e.target.value);
              setCampusSuggestions(
                allCampuses.filter(c =>
                  c.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
              setSelectedCampus("");
            }}
            className="campus-input"
            autoComplete="off"
          />
          {campusSuggestions.length > 0 && campusInput && (
            <ul className="campus-dropdown">
              {campusSuggestions.map(c => (
                <li
                  key={c}
                  onClick={() => {
                    setSelectedCampus(c);
                    setCampusInput(c);
                    setCampusSuggestions([]);
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
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
                  <li key={i}>
                    <ReactMarkdown>{pt}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            ) : (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
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
