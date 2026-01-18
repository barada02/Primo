const express = require('express');
const router = express.Router();
const { Habit, NuclearTask } = require('../models/Schemas');

// --- HABIT ROUTES ---

// Get all habits for a user (Mocking userId logic for now)
router.get('/habits', async (req, res) => {
    // TODO: Get userId from Auth Middleware
    // For V1 Demo, we might just fetch all or pass userId in query
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new Habit
router.post('/habits', async (req, res) => {
    try {
        const newHabit = new Habit(req.body);
        const saved = await newHabit.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Check-in (Toggle functionality)
router.put('/habits/:id/check-in', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ error: 'Not found' });

        // Simple Toggle Logic for Demo
        if (!habit.completedToday) {
            habit.streak += 1;
            habit.completedToday = true;
            habit.lastCompletedDate = new Date();
        } else {
            // Undo check-in
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
    try {
        const tasks = await NuclearTask.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/tasks', async (req, res) => {
    try {
        const newTask = new NuclearTask(req.body);
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

module.exports = router;
