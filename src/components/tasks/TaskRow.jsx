import React from 'react';
import { Circle, CheckCircle, MoreVertical } from 'lucide-react';
import './TaskRow.css';

const TaskRow = ({ task }) => {
    return (
        <div className={`task-row ${task.completedToday ? 'completed' : ''}`}>
            <div className="task-left">
                <button className="check-btn">
                    {task.completedToday ? (
                        <CheckCircle className="icon-checked" size={20} />
                    ) : (
                        <Circle className="icon-unchecked" size={20} />
                    )}
                </button>

                <div className="task-info">
                    <span className="task-title">{task.title}</span>
                    <div className="task-meta">
                        {task.time && (
                            <>
                                <span className="task-time" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                    {task.time}
                                </span>
                                <span className="meta-dot">•</span>
                            </>
                        )}
                        <span className="task-category">{task.category || 'Habit'}</span>

                        {task.type === 'habit' && (
                            <>
                                <span className="meta-dot">•</span>
                                <span className="task-streak">🔥 {task.streak}/{task.goal} days</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <button className="task-options">
                <MoreVertical size={16} />
            </button>
        </div>
    );
};

export default TaskRow;
