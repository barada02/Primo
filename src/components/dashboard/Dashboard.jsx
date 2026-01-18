import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import TimeChart from './TimeChart';
import StatCard from './StatCard';
import TaskRow from '../tasks/TaskRow';
import { Flame } from 'lucide-react';
import { mockTimeData, mockStats } from '../../data/mockData';
import { api } from '../../services/api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [habits, nuclearTasks] = await Promise.all([
                    api.getHabits(),
                    api.getTasks()
                ]);

                // Normalize and merge data
                const normalizedHabits = habits.map(h => ({
                    ...h,
                    type: 'habit',
                    streak: h.streak || 0,
                    goal: h.goalDuration || 21
                }));

                const normalizedTasks = nuclearTasks.map(t => ({
                    ...t,
                    type: 'nuclear',
                    time: t.reminderTime,
                    completedToday: t.isCompleted
                }));

                // Combine and Sort
                const united = [...normalizedHabits, ...normalizedTasks].sort((a, b) => {
                    if (a.time && !b.time) return -1;
                    if (!a.time && b.time) return 1;
                    if (a.time && b.time) return a.time.localeCompare(b.time);
                    return 0;
                });

                setTasks(united);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleToggle = async (task) => {
        // Optimistic UI Update
        const updatedTasks = tasks.map(t =>
            t._id === task._id ? { ...t, completedToday: !t.completedToday } : t
        );
        setTasks(updatedTasks);

        try {
            if (task.type === 'habit') {
                await api.checkInHabit(task._id);
            } else {
                await api.toggleTask(task._id);
            }
        } catch (err) {
            console.error("Failed to toggle", err);
            // Revert on error (fetching again would be safer but keeping simple for now)
            setTasks(tasks);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Good Morning, User</h1>
                    <p className="subtitle">Let's make today count.</p>
                </div>
                <div className="header-actions">
                    <span className="date-badge">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </header>

            <div className="dashboard-grid">
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

                    {loading ? (
                        <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-3)' }}>Loading your day...</div>
                    ) : tasks.length === 0 ? (
                        <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-3)' }}>
                            No tasks yet. Click "Create New" to start!
                        </div>
                    ) : (
                        tasks.map(task => (
                            <TaskRow key={task._id} task={task} onToggle={handleToggle} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
