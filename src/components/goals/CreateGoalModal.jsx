import React, { useState } from 'react';
import { X, Target, Calendar, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import '../tasks/CreateTaskModal.css'; // Reusing style

const CreateGoalModal = ({ onClose, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Personal');
    const [motivation, setMotivation] = useState('');
    const [deadline, setDeadline] = useState('');
    const [loading, setLoading] = useState(false);

    // Simplistic Theme Selection (Gradient Presets)
    const gradients = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
    ];
    const [theme, setTheme] = useState(gradients[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.createGoal({
                title,
                category,
                motivation,
                deadline,
                theme
            });
            onSuccess();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel" style={{ maxWidth: '450px' }}>
                <div className="modal-header">
                    <h2>New Vision Goal</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="input-group">
                        <label>Goal Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Run a Marathon"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Category</label>
                        <div className="select-wrapper">
                            <Target size={16} className="input-icon" />
                            <select value={category} onChange={e => setCategory(e.target.value)}>
                                <option>Personal</option>
                                <option>Career</option>
                                <option>Health</option>
                                <option>Financial</option>
                                <option>Skill</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Target Date</label>
                        <div className="select-wrapper">
                            <Calendar size={16} className="input-icon" />
                            <input
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Motivation</label>
                        <textarea
                            rows={2}
                            placeholder="Why does this matter?"
                            value={motivation}
                            onChange={e => setMotivation(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Visual Theme</label>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                            {gradients.map((g, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTheme(g)}
                                    style={{
                                        width: '32px', height: '32px',
                                        borderRadius: '50%', background: g,
                                        border: theme === g ? '2px solid white' : 'none',
                                        cursor: 'pointer'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button className="btn-create" onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Creating...' : 'Create Goal'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGoalModal;
