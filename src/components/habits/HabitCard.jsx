import React from 'react';
import { Check, Flame, Trophy } from 'lucide-react';
import './HabitCard.css';

const HabitCard = ({ habit }) => {
    const progress = (habit.streak / habit.goal) * 100;

    // Create a mock history for the visualizer (last 14 days)
    // In a real app this would come from the DB
    const mockHistory = Array.from({ length: 14 }).map((_, i) => {
        // Randomly assign status for demo purposes
        // We force the last few to match the streak roughly
        return Math.random() > 0.3;
    });

    return (
        <div className="habit-card glass-panel">
            <div className="habit-header">
                <div className="habit-icon-area">
                    <div className="habit-icon">
                        {habit.title.charAt(0)}
                    </div>
                </div>
                <div className="habit-info">
                    <h3>{habit.title}</h3>
                    <span className="habit-category">Health • Daily</span>
                </div>
                <div className="habit-streak-badge">
                    <Flame size={14} className="flame-icon" />
                    <span>{habit.streak}</span>
                </div>
            </div>

            <div className="habit-progress-area">
                <div className="progress-label">
                    <span>Progress to completion</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%`, background: `var(--${progress > 80 ? 'success' : 'primary'})` }}
                    />
                </div>
                <div className="goal-text">
                    Target: {habit.goal} Days
                </div>
            </div>

            <div className="habit-footer">
                <div className="history-grid">
                    {mockHistory.map((done, idx) => (
                        <div
                            key={idx}
                            className={`history-dot ${done ? 'done' : ''}`}
                            title={done ? "Completed" : "Missed"}
                        />
                    ))}
                </div>

                <button className={`check-in-btn ${habit.completedToday ? 'completed' : ''}`}>
                    {habit.completedToday ? (
                        <>
                            <Check size={16} /> Done
                        </>
                    ) : (
                        "Check In"
                    )}
                </button>
            </div>
        </div>
    );
};

export default HabitCard;
