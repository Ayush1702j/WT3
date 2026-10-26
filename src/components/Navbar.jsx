import React from 'react';

export default function Navbar({ enrollmentCount }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div className="brand-titles">
            <h1 className="brand-name">EduPulse Portal</h1>
            <span className="brand-sub">MIT Academy of Engineering | School of Computer Engineering</span>
          </div>
        </div>

        <div className="header-meta">
          <span className="badge badge-academic">WT (2304362L)</span>
          <span className="badge badge-co">Outcome: CO2</span>
          <div className="live-counter">
            <span className="counter-dot"></span>
            <span><strong>{enrollmentCount}</strong> Enrolled</span>
          </div>
        </div>
      </div>
    </header>
  );
}
