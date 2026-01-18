import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import './AuthForm.css';

const AuthForm = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            onLogin();
        }, 800);
    };

    return (
        <div className="auth-card">
            <div className="auth-header">
                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p>{isLogin ? 'Enter your details to access your workspace.' : 'Start your journey to mastery today.'}</p>
            </div>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label>Name</label>
                        <div className="input-wrapper">
                            <User size={18} />
                            <input type="text" placeholder="John Doe" required />
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label>Email</label>
                    <div className="input-wrapper">
                        <Mail size={18} />
                        <input type="email" placeholder="you@example.com" required />
                    </div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                        <Lock size={18} />
                        <input type="password" placeholder="••••••••" required />
                    </div>
                </div>

                <button type="submit" className="auth-submit-btn">
                    {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
                </button>
            </form>

            <div className="auth-footer">
                <p>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="toggle-auth-btn">
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
