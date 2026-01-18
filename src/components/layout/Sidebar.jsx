import React from 'react';
import { LayoutDashboard, CheckCircle, Target, PieChart, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'habits', label: 'Habits', icon: CheckCircle },
        { id: 'goals', label: 'Goals', icon: Target },
        { id: 'analytics', label: 'Analytics', icon: PieChart },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="logo-area">
                <div className="logo-icon">P</div>
                <span className="logo-text">Primo</span>
            </div>

            <nav className="nav-menu">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <Icon size={20} className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                            {isActive && <div className="active-indicator" />}
                        </button>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item">
                    <Settings size={20} className="nav-icon" />
                    <span className="nav-label">Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
