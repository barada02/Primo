export const mockTimeData = [
    { id: 1, label: 'Deep Work', value: 45, color: 'var(--primary)', category: 'Work' },
    { id: 2, label: 'Workout', value: 15, color: 'var(--success)', category: 'Health' },
    { id: 3, label: 'Reading', value: 10, color: 'var(--accent)', category: 'Growth' },
    { id: 4, label: 'Routine', value: 30, color: 'var(--bg-surface-3)', category: 'Life' },
];

export const mockStats = {
    streak: 12,
    tasksCompleted: 8,
    totalTasks: 10,
    productivityScore: 85,
};

// Goals are the parent containers
export const mockGoals = [
    {
        id: 1,
        title: "Become a Full Stack Developer",
        category: "Career",
        motivation: "I want to build my own startup ideas.",
        deadline: "2026-06-30",
        progress: 35,
        theme: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Custom gradient
        stats: { habits: 2, tasks: 5, completed: 1 }
    },
    {
        id: 2,
        title: "Run a Marathon",
        category: "Health",
        motivation: "To prove to myself I can do hard things.",
        deadline: "2026-12-01",
        progress: 12,
        theme: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        stats: { habits: 1, tasks: 0, completed: 0 }
    },
    {
        id: 3,
        title: "Read 25 Books",
        category: "Growth",
        motivation: "Expand my mental models.",
        deadline: "2026-12-31",
        progress: 60,
        theme: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        stats: { habits: 1, tasks: 0, completed: 0 }
    }
];

export const mockHabits = [
    { id: 1, title: 'Morning Run', streak: 45, goal: 75, completedToday: true, goalId: 2 },
    { id: 2, title: 'Read 20 pages', streak: 12, goal: 21, completedToday: false, goalId: 3 },
    { id: 3, title: 'Code 4 hours', streak: 5, goal: 100, completedToday: false, goalId: 1 },
];
