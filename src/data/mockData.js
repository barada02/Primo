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

// --- Analytics Data ---

// 1. Productivity Trend (Last 7 days)
export const mockTrendData = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 55 },
    { day: 'Wed', score: 80 },
    { day: 'Thu', score: 90 },
    { day: 'Fri', score: 85 },
    { day: 'Sat', score: 40 },
    { day: 'Sun', score: 70 },
];

// 2. Category Radar Data
export const mockCategoryData = [
    { subject: 'Work', A: 120, fullMark: 150 },
    { subject: 'Health', A: 98, fullMark: 150 },
    { subject: 'Growth', A: 86, fullMark: 150 },
    { subject: 'Social', A: 99, fullMark: 150 },
    { subject: 'Life', A: 85, fullMark: 150 },
    { subject: 'Spirit', A: 65, fullMark: 150 },
];

// 3. Heatmap Data Generator (Last 365 days mock)
export const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);

        // Random intensity 0-4
        // Higher chance of 0 to make it realistic
        let intensity = 0;
        const rand = Math.random();
        if (rand > 0.8) intensity = 4;
        else if (rand > 0.6) intensity = 3;
        else if (rand > 0.4) intensity = 2;
        else if (rand > 0.2) intensity = 1;

        data.push({
            date: d.toISOString().split('T')[0],
            intensity: intensity
        });
    }
    return data;
};
