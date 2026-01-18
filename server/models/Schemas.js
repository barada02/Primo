const mongoose = require('mongoose');

// 1. User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// 2. Goal Schema (Project/Vision)
const GoalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, default: 'Personal' },
    motivation: { type: String },
    deadline: { type: Date },
    status: { type: String, default: 'active' }, // active, completed, paused
    theme: { type: String }, // CSS gradient string
    progress: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// 3. Habit Schema
const HabitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }, // Optional link to Goal
    title: { type: String, required: true },
    goalDuration: { type: Number, default: 21 },
    streak: { type: Number, default: 0 },
    completedToday: { type: Boolean, default: false },
    lastCompletedDate: Date,
    motivation: String,
    timeOfDay: String, // e.g., "08:00"
    createdAt: { type: Date, default: Date.now }
});

// 4. Nuclear Task Schema
const NuclearTaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }, // Optional link to Goal
    title: { type: String, required: true },
    category: { type: String, default: 'General' },
    notes: String,
    reminderTime: String,
    isCompleted: { type: Boolean, default: false },
    scheduledDate: { type: Date, default: Date.now },
});

// 5. Analytics Snapshot Schema (Optimized for LLM Context)
const AnalyticsSnapshotSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD for easy querying
    metrics: {
        productivityScore: Number, // 0-100
        tasksCompleted: Number,
        habitsCompleted: Number,
        totalFocusTime: Number, // in minutes
    },
    categoryDistribution: {
        Work: Number,
        Health: Number,
        Growth: Number,
        Life: Number
    },
    daySummary: String, // Text description "Good focus on work, missed gym."
});

const User = mongoose.model('User', UserSchema);
const Goal = mongoose.model('Goal', GoalSchema);
const Habit = mongoose.model('Habit', HabitSchema);
const NuclearTask = mongoose.model('NuclearTask', NuclearTaskSchema);
const AnalyticsSnapshot = mongoose.model('AnalyticsSnapshot', AnalyticsSnapshotSchema);

module.exports = { User, Goal, Habit, NuclearTask, AnalyticsSnapshot };
