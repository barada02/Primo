const express = require('express');
const router = express.Router();
const { Habit, NuclearTask, Goal, AnalyticsSnapshot, User } = require('../models/Schemas');

// --- HELPER ---
// For the Hackathon Demo, we will fetch the dedicated "Primo Visitor" user
const getDemoUserId = async () => {
    const user = await User.findOne({ email: "visitor@primo.app" });
    return user ? user._id : null;
};

// --- HABIT ROUTES ---
router.get('/habits', async (req, res) => {
    const userId = await getDemoUserId();
    try {
        const habits = await Habit.find({ userId });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/habits', async (req, res) => {
    const userId = await getDemoUserId();
    try {
        const newHabit = new Habit({ ...req.body, userId });
        const saved = await newHabit.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/habits/:id/check-in', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ error: 'Not found' });

        if (!habit.completedToday) {
            habit.streak += 1;
            habit.completedToday = true;
            habit.lastCompletedDate = new Date();
        } else {
            habit.streak = Math.max(0, habit.streak - 1);
            habit.completedToday = false;
        }

        await habit.save();
        res.json(habit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- NUCLEAR TASK ROUTES ---
router.get('/tasks', async (req, res) => {
    const userId = await getDemoUserId();
    try {
        const tasks = await NuclearTask.find({ userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/tasks', async (req, res) => {
    const userId = await getDemoUserId();
    try {
        const newTask = new NuclearTask({ ...req.body, userId });
        const saved = await newTask.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/tasks/:id/toggle', async (req, res) => {
    try {
        const task = await NuclearTask.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Not found' });

        task.isCompleted = !task.isCompleted;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- GOAL ROUTES ---
router.get('/goals', async (req, res) => {
    const userId = await getDemoUserId();
    try {
        const goals = await Goal.find({ userId });
        // Enhance goals with stats (count habits/tasks)
        const EnhancedGoals = await Promise.all(goals.map(async (g) => {
            const habitCount = await Habit.countDocuments({ goalId: g._id });
            const taskCount = await NuclearTask.countDocuments({ goalId: g._id });
            return {
                ...g.toObject(),
                stats: { habits: habitCount, tasks: taskCount, completed: 0 }
            };
        }));
        res.json(EnhancedGoals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/goals', async (req, res) => {
    const userId = await getDemoUserId();
    try {
        const newGoal = new Goal({ ...req.body, userId });
        const saved = await newGoal.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- ANALYTICS ROUTES ---
router.get('/analytics', async (req, res) => {
    const userId = await getDemoUserId();
    try {
        const snapshots = await AnalyticsSnapshot.find({ userId }).sort({ date: 1 });
        res.json(snapshots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
