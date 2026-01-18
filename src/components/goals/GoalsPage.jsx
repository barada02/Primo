import React, { useState, useEffect } from 'react';
import GoalCard from './GoalCard';
import { api } from '../../services/api'; // Import API
import './GoalsPage.css';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await api.getGoals();
        setGoals(data);
      } catch (err) {
        console.error("Failed to fetch goals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading Vision Board...</div>;
  }

  // Handle case where no goals exist yet
  if (goals.length === 0) {
    return (
      <div className="goals-page-container">
        <header className="page-header">
          <h1>Vision Board</h1>
          <p className="subtitle">Your north star metrics.</p>
        </header>
        <div className="empty-state">No goals set. Create one to get started!</div>
      </div>
    );
  }

  // First goal is Hero
  const heroGoal = goals[0];
  const otherGoals = goals.slice(1);

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
            <GoalCard key={goal._id} goal={goal} />
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
