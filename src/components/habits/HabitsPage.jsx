import React, { useState, useEffect } from 'react';
import HabitCard from './HabitCard';
import { api } from '../../services/api';
import './HabitsPage.css';

const HabitsPage = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const data = await api.getHabits();
                // Normalize basic data for the card if needed
                const mapped = data.map(h => ({
                    ...h,
                    id: h._id, // Map _id to id for compatibility
                    goal: h.goalDuration
                }));
                setHabits(mapped);
            } catch (err) {
                console.error("Failed to fetch habits", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHabits();
    }, []);

    return (
        <div className="habits-page-container">
            <header className="page-header">
                <div>
                    <h1>My Habits</h1>
                    <p className="subtitle">Consistency is the key to mastery.</p>
                </div>
            </header>

            {loading ? (
                <div className="text-center p-10">Loading habits...</div>
            ) : (
                <div className="habits-grid">
                    {habits.map(habit => (
                        <HabitCard key={habit.id} habit={habit} />
                    ))}

                    {habits.length === 0 && (
                        <div className="text-center col-span-full">
                            No habits found. Create one from the sidebar!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HabitsPage;
