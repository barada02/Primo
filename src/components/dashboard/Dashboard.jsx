import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Good Morning, User</h1>
                    <p className="subtitle">Let's make today count.</p>
                </div>
                <div className="header-actions">
                    {/* Placeholder for date/time or actions */}
                    <span className="date-badge">Jan 18, 2026</span>
                </div>
            </header>

            <div className="dashboard-grid">
                {/* We will populate these next */}
                <div className="grid-item span-2 glass-panel placeholder-widget">
                    <h3>Time Distribution</h3>
                </div>
                <div className="grid-item glass-panel placeholder-widget">
                    <h3>Consistency</h3>
                </div>
                <div className="grid-item span-3 glass-panel placeholder-widget">
                    <h3>Today's Focus</h3>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
