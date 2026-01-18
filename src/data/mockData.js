export const mockTimeData = [
    { id: 1, label: 'Deep Work', value: 45, color: 'var(--primary)', category: 'Work' },
    { id: 2, label: 'Workout', value: 15, color: 'var(--success)', category: 'Health' },
    { id: 3, label: 'Reading', value: 10, color: 'var(--accent)', category: 'Growth' },
    { id: 4, label: 'Routine', value: 30, color: 'var(--bg-surface-3)', category: 'Life' },
];

export const mockStats = {
    streak: 12, // Global "Perfect Day" streak
    tasksCompleted: 8,
    totalTasks: 10,
    productivityScore: 85,
};

export const mockGoals = [
    {
        id: 1,
        title: "Become a Full Stack Developer",
        category: "Career",
        motivation: "I want to build my own startup ideas.",
        deadline: "2026-06-30",
        progress: 35,
        theme: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    { id: 1, type: 'habit', title: 'Morning Run', streak: 45, goal: 75, completedToday: true, goalId: 2, time: '06:00' },
    { id: 2, type: 'habit', title: 'Read 20 pages', streak: 12, goal: 21, completedToday: false, goalId: 3, time: '21:00' },
    { id: 3, type: 'habit', title: 'Code 4 hours', streak: 5, goal: 100, completedToday: false, goalId: 1, time: '10:00' },
];

export const mockTasks = [
    { id: 101, type: 'nuclear', title: 'Buy Groceries', category: 'Life', completedToday: false, time: '17:00' },
    { id: 102, type: 'nuclear', title: 'Call Mom', category: 'Family', completedToday: false, time: '19:00' },
    { id: 103, type: 'nuclear', title: 'Finish API Docs', category: 'Work', completedToday: true, time: '14:00' },
];

export const getTodaysfocus = () => {
    // Merge and sort by time
    const all = [...mockHabits, ...mockTasks];
    return all.sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
    });
};

/* ... Analytics Data (same as before) ... */
export const mockTrendData = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 55 },
    { day: 'Wed', score: 80 },
    { day: 'Thu', score: 90 },
    { day: 'Fri', score: 85 },
    { day: 'Sat', score: 40 },
    { day: 'Sun', score: 70 },
];

export const mockCategoryData = [
    { subject: 'Work', A: 120, fullMark: 150 },
    { subject: 'Health', A: 98, fullMark: 150 },
    { subject: 'Growth', A: 86, fullMark: 150 },
    { subject: 'Social', A: 99, fullMark: 150 },
    { subject: 'Life', A: 85, fullMark: 150 },
    { subject: 'Spirit', A: 65, fullMark: 150 },
];

export const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
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
