import React from 'react';
import { Calendar, Target, Layers, ArrowRight } from 'lucide-react';
import './GoalCard.css';

const GoalCard = ({ goal, isHero = false }) => {
  return (
    <div className={`goal-card ${isHero ? 'hero-card' : ''}`}>
      <div 
        className="goal-bg-visual" 
        style={{ background: goal.theme }}
      />
      
      <div className="goal-content">
        <div className="goal-top-meta">
          <span className="goal-category">{goal.category}</span>
          <div className="goal-deadline">
            <Calendar size={12} />
            <span>Target: {goal.deadline}</span>
          </div>
        </div>

        <h3 className="goal-title">{goal.title}</h3>
        
        {isHero && (
          <p className="goal-motivation">"{goal.motivation}"</p>
        )}

        <div className="goal-stats-row">
          <div className="meta-stat">
            <Layers size={14} />
            <span>{goal.stats.habits} Habits</span>
          </div>
          <div className="meta-stat">
            <Target size={14} />
            <span>{goal.stats.tasks} Tasks</span>
          </div>
        </div>

        <div className="goal-progress-section">
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <div className="progress-text">
            <span>{goal.progress}% Complete</span>
          </div>
        </div>
      </div>
      
      <button className="goal-action-btn">
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default GoalCard;
