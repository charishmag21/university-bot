import React from "react";
import "../style.css";

export default function TermsOfService() {
  return (
    <div className="legal-container glass">
      <h2>Terms of Service</h2>
      <p>
        <b>Effective Date: June 2025</b>
      </p>
      <p>
        By using CampusAI, you agree to these terms:
      </p>
      <h3>1. Use of Service</h3>
      <ul>
        <li>You must use CampusAI in accordance with all applicable laws.</li>
        <li>You are responsible for any information you provide.</li>
      </ul>
      <h3>2. Intellectual Property</h3>
      <ul>
        <li>All content and branding on CampusAI is owned by us. Please don’t use it without permission.</li>
      </ul>
      <h3>3. Disclaimer</h3>
      <ul>
        <li>We strive for accuracy, but information may change. Please verify with official university sources.</li>
      </ul>
      <h3>4. Changes to Terms</h3>
      <ul>
        <li>We may update these terms. We’ll notify users of significant changes.</li>
      </ul>
      <h3>Contact Us</h3>
      <p>
        Questions? Email <a href="mailto:support@campusai.ca">support@campusai.ca</a>.
      </p>
    </div>
  );
}
