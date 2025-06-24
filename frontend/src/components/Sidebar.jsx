import React, { useState, useEffect } from "react";

export default function Sidebar({ university, setUniversity, campus, setCampus }) {
  const [cities, setCities] = useState([]);
  const [campusInput, setCampusInput] = useState(campus || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch the cities.json file once on mount
  useEffect(() => {
    fetch("/cities.json")
      .then(res => res.json())
      .then(data => setCities(data));
  }, []);

  // Filter city objects as user types, limiting results for performance
  const campusSuggestions = campusInput
    ? cities.filter(city =>
        city.name.toLowerCase().includes(campusInput.toLowerCase())
      ).slice(0, 10)
    : [];

  const handleCampusInput = (e) => {
    const val = e.target.value;
    setCampusInput(val);
    setCampus(val); // Update in parent
    setShowSuggestions(true);
  };

  // When user clicks suggestion, fill input with full info
  const handleSuggestionClick = (suggestion) => {
    setCampusInput(suggestion);
    setCampus(suggestion);
    setShowSuggestions(false);
  };

  // Delay hiding dropdown to allow click
  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 100);

  return (
    <aside className="sidebar">
      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <img src="/university-generic.png" alt="CampusAI Logo" className="logo" />
        <h2>CampusAI</h2>
      </a>
      <p className="side-desc">Your guide to universities and colleges worldwide</p>
      <div className="side-form">
        <label>University Name</label>
        <input
          type="text"
          className="uni-input"
          value={university}
          onChange={e => setUniversity(e.target.value)}
          placeholder="e.g. University of Toronto, Harvard, Oxford, IIT Delhi"
        />
        <label>Campus or City</label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="campus-input"
            value={campusInput}
            placeholder="e.g. Toronto, Boston, London, Delhi, Melbourne"
            onChange={handleCampusInput}
            autoComplete="off"
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
          />
          {showSuggestions && campusSuggestions.length > 0 && (
            <ul className="campus-dropdown">
              {campusSuggestions.map(city => {
                // Build label like "London, England, United Kingdom"
                const label = `${city.name}${city.subcountry ? ", " + city.subcountry : ""}, ${city.country}`;
                return (
                  <li
                    key={city.geonameid || label}
                    onMouseDown={() => handleSuggestionClick(label)}
                  >
                    {label}
                  </li>
                );
              })}
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
