import React, { useState } from 'react';
import { X, Calendar, Tag, Target } from 'lucide-react';
import './CreateTaskModal.css';

const CreateTaskModal = ({ onClose }) => {
    const [type, setType] = useState('habit'); // habit | task
    const [duration, setDuration] = useState(21);

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h2>Create New</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    {/* Type Selection */}
                    <div className="type-toggle">
                        <button
                            className={`type-btn ${type === 'habit' ? 'active' : ''}`}
                            onClick={() => setType('habit')}
                        >
                            Habit
                        </button>
                        <button
                            className={`type-btn ${type === 'task' ? 'active' : ''}`}
                            onClick={() => setType('task')}
                        >
                            Goal / Task
                        </button>
                    </div>

                    <div className="input-group">
                        <label>Title</label>
                        <input type="text" placeholder="e.g., Read 30 mins daily" />
                    </div>

                    <div className="input-group">
                        <label>Category</label>
                        <div className="select-wrapper">
                            <Tag size={16} className="input-icon" />
                            <select>
                                <option>Health & Fitness</option>
                                <option>Deep Work</option>
                                <option>Skill Acquisition</option>
                                <option>Mindfulness</option>
                            </select>
                        </div>
                    </div>

                    {type === 'habit' && (
                        <div className="input-group">
                            <label>Consistency Goal (Days)</label>
                            <div className="duration-options">
                                {[21, 66, 75, 90].map(d => (
                                    <button
                                        key={d}
                                        className={`duration-chip ${duration === d ? 'active' : ''}`}
                                        onClick={() => setDuration(d)}
                                    >
                                        {d} Days
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button className="btn-create">Create {type === 'habit' ? 'Habit' : 'Goal'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;
