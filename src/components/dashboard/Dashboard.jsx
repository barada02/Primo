import React from 'react';
import './Dashboard.css';
import TimeChart from './TimeChart';
import StatCard from './StatCard';
import TaskRow from '../tasks/TaskRow';
import { Flame } from 'lucide-react';
import { mockTimeData, mockStats, mockHabits } from '../../data/mockData';

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
                <div className="grid-item span-2 glass-panel">
                    <h3>Time Distribution</h3>
                    <TimeChart data={mockTimeData} />
                </div>
                <div className="grid-item glass-panel">
                    <StatCard
                        title="Current Streak"
                        value={`${mockStats.streak} Days`}
                        icon={Flame}
                        type="streak"
                    />
                </div>
                <div className="grid-item span-3 glass-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h3>Today's Focus</h3>
                        <button style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>View All</button>
                    </div>
                    {mockHabits.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
