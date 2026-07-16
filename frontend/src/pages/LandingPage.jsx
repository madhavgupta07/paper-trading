import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1a1a2e"/>
            <path d="M7 22L13 15L18 18L25 10" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 10H25V14" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="13" cy="15" r="2" fill="#00c853"/>
            <circle cx="18" cy="18" r="2" fill="#00c853"/>
            <circle cx="25" cy="10" r="2" fill="#00c853"/>
          </svg>
          <span>PaperTrader</span>
        </div>
        <div className="landing-nav-links">
          <Link to="/login" className="btn btn-outline btn-sm">Sign In</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-badge">Virtual Trading Platform</div>
        <h1 className="hero-title">
          Master the Market<br />
          <span className="hero-accent">Without the Risk</span>
        </h1>
        <p className="hero-subtitle">
          Practice trading with real-time market data and a virtual $100,000 portfolio.
          Build your strategy, track performance, and sharpen your skills — all risk-free.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary btn-lg">Start Trading Free</Link>
          <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">15+</span>
            <span className="hero-stat-label">Live Stocks</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">$100K</span>
            <span className="hero-stat-label">Virtual Cash</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">Real-Time</span>
            <span className="hero-stat-label">Price Feeds</span>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="section-title">Why PaperTrader?</h2>
        <p className="section-subtitle">Everything you need to learn trading, without risking a dime.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>Real-Time Data</h3>
            <p>Live stock prices streamed directly to your dashboard via WebSocket. Trade as if the market were open.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00c853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>$100,000 Virtual Cash</h3>
            <p>Start with a generous virtual portfolio. Buy and sell stocks just like a real brokerage account.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffa726" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            </div>
            <h3>Portfolio Tracking</h3>
            <p>Monitor your holdings, track profit and loss, and review your complete order history in real time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e040fb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3>Price Charts</h3>
            <p>Interactive charts let you analyze price history and spot trends before placing your next trade.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff1744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3>Risk-Free Learning</h3>
            <p>Make mistakes, test strategies, and learn from experience — no real money on the line.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Instant Account</h3>
            <p>Sign up in seconds. No credit card, no KYC. Start trading immediately after registration.</p>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="cta-card">
          <h2>Ready to Start Trading?</h2>
          <p>Join PaperTrader and get $100,000 in virtual cash to practice with real-time market data.</p>
          <Link to="/register" className="btn btn-primary btn-lg">Create Free Account</Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-brand">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1a1a2e"/>
            <path d="M7 22L13 15L18 18L25 10" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 10H25V14" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>PaperTrader</span>
        </div>
        <p className="footer-note">Virtual trading platform for educational purposes only. No real money involved.</p>
      </footer>
    </div>
  );
}
