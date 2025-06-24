import React, { useState, useEffect } from "react";
import "../style.css";

const testimonials = [
  {
    text: "CampusAI made my university search so much easier! I found the perfect program and city in minutes.",
    name: "Priya",
    role: "Future UofT Student",
  },
  {
    text: "The AI helped me compare options between London and New York, I never imagined the process could be this simple.",
    name: "Emily",
    role: "Incoming LSE Student",
  },
  {
    text: "With CampusAI, I found my dream university in Australia and connected with alumni from my country. Highly recommended!",
    name: "Amit",
    role: "UNSW Engineering Admit",
  },
  {
    text: "I loved the instant answers and the scholarship recommendations. Highly recommend for international students!",
    name: "Zainab",
    role: "McGill Student",
  },
  {
    text: "CampusAI's guidance helped me compare top US and German universities at a glance!",
    name: "Lucas",
    role: "TU Munich Engineering Admit",
  }
];

// --- SVG Wave as a React Component ---
const SectionWave = ({ flip }) => (
  <svg
    className="section-divider-wave"
    viewBox="0 0 1440 110"
    preserveAspectRatio="none"
    style={{
      width: "100vw",
      height: "100px",
      display: "block",
      transform: flip ? "scaleY(-1)" : undefined,
      marginBottom: flip ? "-1px" : "-1px",
    }}
  >
    <defs>
      <linearGradient id="divider-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d3eafd" />
        <stop offset="100%" stopColor="#eaf6ff" />
      </linearGradient>
    </defs>
    <path
      d="M0,60 C400,110 1100,10 1440,80 L1440,110 L0,110 Z"
      fill="url(#divider-gradient)"
      opacity="0.7"
    ></path>
  </svg>
);

export default function HomePage({ onStart }) {
  // Carousel state
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setIndex((prev) => (prev + 1) % testimonials.length),
      4200
    );
    return () => clearTimeout(timer);
  }, [index]);

  const { text, name, role } = testimonials[index];

  return (
    <div className="homepage-premium">
      {/* Sticky Navbar */}
      <nav className="premium-navbar">
        <div className="navbar-left">
          <img src="/university-generic.png" alt="CampusAI Logo" className="navbar-logo" />
          <span className="navbar-title">CampusAI</span>
        </div>
        <div className="navbar-actions">
          <a href="#features" className="navbar-link">Features</a>
          <a href="#how" className="navbar-link">How it Works</a>
          <a href="#testimonial" className="navbar-link">Testimonials</a>
          {/* Login/Signup removed */}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="premium-hero">
        <div className="hero-bg-wave"></div>
        <h1 className="hero-title">Your Future, Your Campus</h1>
        <p className="homepage-tagline">
        Explore your future with personalized university matches, global insights, and instant AI-powered answers,<br />everything you need to start your next chapter, anywhere in the world.
        </p>
        <button className="homepage-start-btn" onClick={onStart}>
          Get Started
        </button>
      </header>
      {/* Hero to Features transition */}
      <SectionWave />

      {/* Features */}
      <section className="homepage-features glass" id="features">
        <h2>Features</h2>
        <div className="features-glass-row">
          <div className="feature-glass-card">
            <div className="feature-title">Smart Campus Match</div>
            <div className="feature-desc">
              Instantly discover universities and colleges around the world that fit your dreams and profile.<br />
              <span className="feature-sub">Our AI analyzes your preferences, academics, and goals to suggest the best options worldwide.</span>
            </div>
          </div>
          <div className="feature-glass-card">
            <div className="feature-title">AI Guidance, Anytime</div>
            <div className="feature-desc">
              Get real-time answers on programs, admissions, and campus life.<br />
              <span className="feature-sub">Ask anything, anytime, our AI advisor is always ready to help.</span>
            </div>
          </div>
          <div className="feature-glass-card">
            <div className="feature-title">Compare Your Options</div>
            <div className="feature-desc">
              Instantly compare tuition, courses, and campus life across universities.<br />
              <span className="feature-sub">Make smart choices with side-by-side stats, costs, and career prospects.</span>
            </div>
          </div>
          <div className="feature-glass-card">
            <div className="feature-title">Real Voices, Real Insights</div>
            <div className="feature-desc">
              Hear from real students about their authentic campus experiences.<br />
              <span className="feature-sub">Read genuine stories, tips, and hacks to get a true feel for student life.</span>
            </div>
          </div>
        </div>
      </section>
      <SectionWave flip />

      {/* How it Works */}
      <section className="homepage-how glass" id="how">
        <h2>How It Works</h2>
        <div className="howit-glass-row">
          <div className="howit-glass-card">
            <div className="howit-title">Enter Your Preferences</div>
            <div className="howit-desc">
              Tell CampusAI your interests, preferred city, program, or budget, just type or pick from suggestions.
            </div>
          </div>
          <div className="howit-glass-card">
            <div className="howit-title">Chat and Compare</div>
            <div className="howit-desc">
              Ask questions, compare programs, and explore real student insights, AI gives you everything instantly.
            </div>
          </div>
          <div className="howit-glass-card">
            <div className="howit-title">Get Personalized Results</div>
            <div className="howit-desc">
              Receive your best-match universities and clear next steps for applying or connecting.
            </div>
          </div>
          <div className="howit-glass-card">
            <div className="howit-title">Achieve Your Dreams</div>
            <div className="howit-desc">
                Unlock your future, start your global university journey with confidence, clarity, and support from CampusAI.
            </div>
            </div>
        </div>
      </section>
      <SectionWave />

      {/* Testimonials - Carousel */}
      <section className="homepage-testimonial glass" id="testimonial">
        <blockquote>
          <p>“{text}”</p>
        </blockquote>
        <footer>
          — {name}, <span className="testimonial-role">{role}</span>
        </footer>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`testimonial-dot${i === index ? " active" : ""}`}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </section>
      <SectionWave flip />

      {/* Footer */}
      <footer className="homepage-footer glass-footer" id="footer">
        <div className="footer-columns">
          <div>
            <div className="footer-title">Contact</div>
            <div>
              <a href="mailto:contactcampusai@gmail.com" className="footer-email">
                contactcampusai@gmail.com
              </a>
            </div>
            <div>+1 (416) 289-1444</div>
          </div>
          <div>
            <div className="footer-title">Quick Links</div>
            <a href="#features">Features</a>
            <a href="#how">How it Works</a>
            <a href="#testimonial">Testimonials</a>
          </div>
          <div>
            <div className="footer-title">Legal</div>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          Made with <span style={{ color: "#e25555" }}>❤️</span> in Canada • CampusAI © 2025
        </div>
      </footer>
    </div>
  );
}
