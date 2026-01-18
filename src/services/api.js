const API_BASE = 'http://localhost:5000/api';

export const api = {
    // Habits
    getHabits: async () => {
        const res = await fetch(`${API_BASE}/habits`);
        return res.json();
    },
    createHabit: async (habitData) => {
        const res = await fetch(`${API_BASE}/habits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(habitData)
        });
        return res.json();
    },
    checkInHabit: async (id) => {
        const res = await fetch(`${API_BASE}/habits/${id}/check-in`, {
            method: 'PUT'
        });
        return res.json();
    },

    // Nuclear Tasks
    getTasks: async () => {
        const res = await fetch(`${API_BASE}/tasks`);
        return res.json();
    },
    createTask: async (taskData) => {
        const res = await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        return res.json();
    },
    toggleTask: async (id) => {
        const res = await fetch(`${API_BASE}/tasks/${id}/toggle`, {
            method: 'PUT'
        });
        return res.json();
    }
};
