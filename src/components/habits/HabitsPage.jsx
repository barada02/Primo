import React from 'react';
import HabitCard from './HabitCard';
import { mockHabits } from '../../data/mockData';
import './HabitsPage.css';

const HabitsPage = () => {
    return (
        <div className="habits-page-container">
            <header className="page-header">
                <div>
                    <h1>My Habits</h1>
                    <p className="subtitle">Consistency is the key to mastery.</p>
                </div>
            </header>

            <div className="habits-grid">
                {mockHabits.map(habit => (
                    <HabitCard key={habit.id} habit={habit} />
                ))}

                {/* Mocking a few more to show grid layout */}
                <HabitCard habit={{ id: 99, title: "Meditation", streak: 60, goal: 90, completedToday: true }} />
                <HabitCard habit={{ id: 98, title: "Journaling", streak: 2, goal: 30, completedToday: false }} />
            </div>
        </div>
    );
};

export default HabitsPage;
