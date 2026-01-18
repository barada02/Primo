import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ title, value, subtext, icon: Icon, type = 'default' }) => {
    return (
        <div className={`stat-card ${type}`}>
            <div className="stat-header">
                <span className="stat-title">{title}</span>
                {Icon && <Icon className="stat-icon" size={20} />}
            </div>
            <div className="stat-body">
                <span className="stat-value">{value}</span>
                {subtext && <span className="stat-subtext">{subtext}</span>}
            </div>

            {/* Visual flair for 'streak' type */}
            {type === 'streak' && (
                <div className="streak-visual">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`streak-dot ${i > 2 ? 'active' : ''}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatCard;
