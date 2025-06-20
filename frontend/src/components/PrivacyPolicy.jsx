import React from "react";
import "../style.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-container glass">
      <h2>Privacy Policy</h2>
      <p>
        <b>Effective Date: June 2025</b>
      </p>
      <p>
        CampusAI (“we”, “our”, or “us”) values your privacy. This policy explains how we collect, use, and safeguard your information when you use our website.
      </p>
      <h3>Information We Collect</h3>
      <ul>
        <li>Personal information you provide (e.g., name, email, preferences).</li>
        <li>Usage data and cookies to improve your experience.</li>
      </ul>
      <h3>How We Use Your Information</h3>
      <ul>
        <li>To personalize your CampusAI experience.</li>
        <li>To communicate updates and important information.</li>
        <li>To improve our services and ensure security.</li>
      </ul>
      <h3>Your Choices</h3>
      <ul>
        <li>You can request to access or delete your data by contacting us at <a href="mailto:support@campusai.ca">support@campusai.ca</a>.</li>
      </ul>
      <h3>Contact Us</h3>
      <p>
        Questions about our privacy policy? Email <a href="mailto:support@campusai.ca">support@campusai.ca</a>.
      </p>
    </div>
  );
}
