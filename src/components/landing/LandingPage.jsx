import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';
import AuthForm from '../auth/AuthForm';
import './LandingPage.css';

const LandingPage = ({ onLogin, onVisitorAccess }) => {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div className="landing-container">
            <nav className="landing-nav">
                <div className="landing-logo">PRIMO</div>
                <div className="nav-links">
                    <button className="nav-link" onClick={() => setShowAuth(true)}>Log In</button>
                    <button className="nav-cta" onClick={() => setShowAuth(true)}>Get Started</button>
                </div>
            </nav>

            <main className="landing-hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Zap size={14} fill="currentColor" />
                        <span>Productivity Redefined</span>
                    </div>
                    <h1 className="hero-title">
                        Master Your Discipline. <br />
                        <span className="text-gradient">Design Your Life.</span>
                    </h1>
                    <p className="hero-subtitle">
                        The all-in-one workspace for habits, goals, and deep work.
                        Stop managing lists. Start managing consistency.
                    </p>

                    <div className="hero-actions">
                        <button className="primary-cta" onClick={() => setShowAuth(true)}>
                            Start Your Journey
                        </button>
                        <button className="secondary-cta" onClick={onVisitorAccess}>
                            Try Demo (No Account) <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="hero-features">
                        <div className="feature-item">
                            <CheckCircle size={18} className="feature-icon" />
                            <span>Habit Streaks</span>
                        </div>
                        <div className="feature-item">
                            <Shield size={18} className="feature-icon" />
                            <span>Visual Analytics</span>
                        </div>
                        <div className="feature-item">
                            <Zap size={18} className="feature-icon" />
                            <span>Vision Board</span>
                        </div>
                    </div>
                </div>

                {/* Visual Decoration */}
                <div className="hero-visual">
                    <div className="glass-card visual-card-1">
                        <div className="mock-stat">
                            <span className="label">Current Streak</span>
                            <span className="value">42 Days</span>
                        </div>
                    </div>
                    <div className="glass-card visual-card-2">
                        <div className="mock-graph"></div>
                    </div>
                </div>
            </main>

            {showAuth && (
                <div className="auth-modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) setShowAuth(false);
                }}>
                    <div className="auth-modal-content">
                        <AuthForm onLogin={onLogin} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
