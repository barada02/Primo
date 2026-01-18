import React from 'react';
import GoalCard from './GoalCard';
import { mockGoals } from '../../data/mockData';
import './GoalsPage.css';

const GoalsPage = () => {
  const heroGoal = mockGoals[0]; // Assume first is priority for now
  const otherGoals = mockGoals.slice(1);

  return (
    <div className="goals-page-container">
      <header className="page-header">
        <h1>Vision Board</h1>
        <p className="subtitle">Your north star metrics.</p>
      </header>

      {/* Hero Section */}
      <section className="goals-hero-section">
        <h2 className="section-label">Main Focus</h2>
        <div className="hero-wrapper">
          <GoalCard goal={heroGoal} isHero={true} />
        </div>
      </section>

      {/* Grid Section */}
      <section className="goals-grid-section">
        <h2 className="section-label">Active Pursuits</h2>
        <div className="goals-grid">
          {otherGoals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
          {/* Add a placeholder empty card for "Add Goal" later */}
          <div className="add-goal-card">
            <span>+ New Goal</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GoalsPage;
