const mongoose = require('mongoose');

// 1. User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// 2. Habit Schema
const HabitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    goalDuration: { type: Number, default: 21 }, // e.g. 21 days
    streak: { type: Number, default: 0 },
    completedToday: { type: Boolean, default: false },
    lastCompletedDate: Date,
    linkedGoalId: String, // Optional referencing a Goal
    motivation: String,
    createdAt: { type: Date, default: Date.now }
});

// 3. Nuclear Task Schema
const NuclearTaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, default: 'General' },
    notes: String,
    reminderTime: String, // e.g., "14:00"
    isCompleted: { type: Boolean, default: false },
    scheduledDate: { type: Date, default: Date.now }, // Defaults to today
});

const User = mongoose.model('User', UserSchema);
const Habit = mongoose.model('Habit', HabitSchema);
const NuclearTask = mongoose.model('NuclearTask', NuclearTaskSchema);

module.exports = { User, Habit, NuclearTask };
