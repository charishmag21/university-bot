import React, { useState } from "react";

const allCampuses = [
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

export default function Sidebar({ university, setUniversity, campus, setCampus }) {
  const [campusInput, setCampusInput] = useState(campus || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const campusSuggestions = campusInput
    ? allCampuses.filter(c =>
        c.toLowerCase().includes(campusInput.toLowerCase())
      )
    : [];

  // Always update campus as user types
  const handleCampusInput = (e) => {
    const val = e.target.value;
    setCampusInput(val);
    setCampus(val); // free-form!
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setCampusInput(suggestion);
    setCampus(suggestion);
    setShowSuggestions(false);
  };

  // Delay hiding dropdown to allow click
  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 100);

  return (
    <aside className="sidebar">
      <img src="/university-generic.png" alt="CampusAI Logo" className="logo" />
      <h2>CampusAI</h2>
      <p className="side-desc">Your guide to Canadian universities</p>
      <div className="side-form">
        <label>University Name</label>
        <input
          type="text"
          className="uni-input"
          value={university}
          onChange={e => setUniversity(e.target.value)}
          placeholder="e.g. University of Toronto"
        />
        <label>Campus or City</label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="campus-input"
            value={campusInput}
            placeholder="e.g. Toronto"
            onChange={handleCampusInput}
            autoComplete="off"
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
          />
          {showSuggestions && campusSuggestions.length > 0 && (
            <ul className="campus-dropdown">
              {campusSuggestions.map(c => (
                <li key={c} onMouseDown={() => handleSuggestionClick(c)}>
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <footer className="sidebar-footer">
        <span>Made with ❤️ in Canada</span>
      </footer>
    </aside>
  );
}
