import React, { useState, useEffect } from 'react';
import { X, Calendar, Tag, Target, Clock, MessageSquare } from 'lucide-react';
import './CreateTaskModal.css';

const CreateTaskModal = ({ onClose }) => {
    const [type, setType] = useState('habit'); // 'habit' | 'nuclear'

    // Common
    const [title, setTitle] = useState('');

    // Habit State
    const [goal, setGoal] = useState(''); // Habits belong to Goals
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState(21);
    const [motivation, setMotivation] = useState('');

    // Nuclear Task State
    const [category, setCategory] = useState('General');
    const [description, setDescription] = useState('');
    const [reminder, setReminder] = useState('');

    // Calculate End Date based on Start Date + Duration
    useEffect(() => {
        if (type === 'habit' && startDate && duration) {
            const start = new Date(startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + parseInt(duration));
            setEndDate(end.toISOString().split('T')[0]);
        }
    }, [startDate, duration, type]);

    const handleDurationChange = (days) => {
        setDuration(days);
    };

    const handleEndDateChange = (e) => {
        const newEnd = e.target.value;
        setEndDate(newEnd);
        if (startDate && newEnd) {
            const start = new Date(startDate);
            const end = new Date(newEnd);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDuration(diffDays);
        }
    };

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
                    {/* Type Toggle */}
                    <div className="type-toggle">
                        <button
                            className={`type-btn ${type === 'habit' ? 'active' : ''}`}
                            onClick={() => setType('habit')}
                        >
                            Habit
                        </button>
                        <button
                            className={`type-btn ${type === 'nuclear' ? 'active' : ''}`}
                            onClick={() => setType('nuclear')}
                        >
                            Nuclear Task
                        </button>
                    </div>

                    <div className="input-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder={type === 'habit' ? "e.g., Morning Run" : "e.g., Buy Groceries"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* HABIT SPECIFIC FIELDS */}
                    {type === 'habit' && (
                        <>
                            <div className="input-group">
                                <label>Linked Goal</label>
                                <div className="select-wrapper">
                                    <Target size={16} className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="e.g., Get Fit for Summer"
                                        value={goal}
                                        onChange={(e) => setGoal(e.target.value)}
                                        style={{ paddingLeft: '40px' }}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Duration & Timeline</label>
                                <div className="date-row">
                                    <div className="date-field">
                                        <span>From</span>
                                        <input
                                            type="date"
                                            value={startDate}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="date-field">
                                        <span>To</span>
                                        <input
                                            type="date"
                                            value={endDate}
                                            min={startDate}
                                            onChange={handleEndDateChange}
                                        />
                                    </div>
                                </div>

                                <div className="duration-options">
                                    {[7, 21, 75, 90].map(d => (
                                        <button
                                            key={d}
                                            className={`duration-chip ${duration === d ? 'active' : ''}`}
                                            onClick={() => handleDurationChange(d)}
                                        >
                                            {d} Days
                                        </button>
                                    ))}
                                    <div className="custom-duration">
                                        <input
                                            type="number"
                                            value={duration}
                                            onChange={(e) => handleDurationChange(parseInt(e.target.value))}
                                            className="duration-input"
                                        />
                                        <span>Days</span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Motivation (Why?)</label>
                                <textarea
                                    placeholder="I want to do this because..."
                                    rows={3}
                                    value={motivation}
                                    onChange={(e) => setMotivation(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {/* NUCLEAR TASK SPECIFIC FIELDS */}
                    {type === 'nuclear' && (
                        <>
                            <div className="input-group">
                                <label>Category</label>
                                <div className="select-wrapper">
                                    <Tag size={16} className="input-icon" />
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option>General</option>
                                        <option>Work</option>
                                        <option>Personal</option>
                                        <option>Shopping</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Reminder (Optional)</label>
                                <div className="select-wrapper">
                                    <Clock size={16} className="input-icon" />
                                    <input
                                        type="time"
                                        value={reminder}
                                        onChange={(e) => setReminder(e.target.value)}
                                        style={{ paddingLeft: '40px' }}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Notes</label>
                                <textarea
                                    placeholder="Any details..."
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button className="btn-create">
                            Create {type === 'habit' ? 'Habit' : 'Task'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;
