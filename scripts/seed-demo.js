import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import Models (Need to use CommonJS require in module? or just redefine for script)
// To keep it simple in this script environment, I'll redefine schemas strictly for seeding
// mirroring the server/models/Schemas.js structure.

const goalSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    category: String,
    motivation: String,
    deadline: Date,
    status: String,
    theme: String,
    progress: Number
});

const habitSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    goalId: mongoose.Schema.Types.ObjectId,
    title: String,
    goalDuration: Number,
    streak: Number,
    completedToday: Boolean,
    lastCompletedDate: Date,
    motivation: String,
    timeOfDay: String
});

const taskSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    category: String,
    notes: String,
    reminderTime: String,
    isCompleted: Boolean,
    scheduledDate: Date
});

const analyticsSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    date: String,
    metrics: Object,
    categoryDistribution: Object,
    daySummary: String
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String // In real app, this would be hashed
});

const User = mongoose.model('User', userSchema);
const Goal = mongoose.model('Goal', goalSchema);
const Habit = mongoose.model('Habit', habitSchema);
const Task = mongoose.model('NuclearTask', taskSchema);
const Analytics = mongoose.model('AnalyticsSnapshot', analyticsSchema);

async function seedData() {
    try {
        console.log('🌱 Connecting to DB...');
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('🧹 Clearing old demo data...');
        // Find existing demo user or create
        const DEMO_EMAIL = "visitor@primo.app";
        let demoUser = await User.findOne({ email: DEMO_EMAIL });

        if (demoUser) {
            // Clear their data
            await Goal.deleteMany({ userId: demoUser._id });
            await Habit.deleteMany({ userId: demoUser._id });
            await Task.deleteMany({ userId: demoUser._id });
            await Analytics.deleteMany({ userId: demoUser._id });
            console.log('   Cleared existing data for visitor.');
        } else {
            console.log('   Creating new Demo User...');
            demoUser = await User.create({
                name: "Primo Visitor",
                email: DEMO_EMAIL,
                password: "demo_access_only"
            });
        }

        const userId = demoUser._id;

        // 1. Create Goals
        console.log('🚀 Seeding Goals...');
        const goal1 = await Goal.create({
            userId,
            title: "Launch SaaS Product",
            category: "Career",
            motivation: "Financial freedom and impact.",
            deadline: new Date("2026-06-01"),
            theme: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            progress: 25
        });

        const goal2 = await Goal.create({
            userId,
            title: "Marathon Training",
            category: "Health",
            motivation: "Push physical limits.",
            deadline: new Date("2026-09-01"),
            theme: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
            progress: 10
        });

        // 2. Create Habits
        console.log('Consistency is key... Seeding Habits...');
        await Habit.create([
            {
                userId,
                goalId: goal2._id,
                title: "Morning 5k Run",
                goalDuration: 90,
                streak: 12,
                completedToday: true,
                timeOfDay: "06:00",
                motivation: "Don't think, just run."
            },
            {
                userId,
                goalId: goal1._id,
                title: "Deep Work Session",
                goalDuration: 100,
                streak: 45,
                completedToday: false,
                timeOfDay: "09:00",
                motivation: "Build the thing."
            },
            {
                userId,
                title: "Read 10 Pages",
                goalDuration: 365,
                streak: 4,
                completedToday: false,
                timeOfDay: "22:00",
                motivation: "Compound knowledge."
            }
        ]);

        // 3. Create Nuclear Tasks (Today's List)
        console.log('⚡ Seeding Tasks...');
        await Task.create([
            {
                userId,
                title: "Draft Marketing Plan",
                category: "Work",
                reminderTime: "11:00",
                isCompleted: false,
                scheduledDate: new Date()
            },
            {
                userId,
                title: "Buy Protein Powder",
                category: "Health",
                reminderTime: "17:30",
                isCompleted: true,
                scheduledDate: new Date()
            },
            {
                userId,
                title: "Call Parents",
                category: "Family",
                reminderTime: "19:00",
                isCompleted: false,
                scheduledDate: new Date()
            }
        ]);

        // 4. Create Analytics History (Last 30 Days)
        console.log('📊 Seeding Analytics History...');
        const analyticsDocs = [];
        const categories = ['Work', 'Health', 'Growth', 'Life'];

        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            // Random stats
            const score = Math.floor(Math.random() * 40) + 60; // 60-100

            analyticsDocs.push({
                userId,
                date: dateStr,
                metrics: {
                    productivityScore: score,
                    tasksCompleted: Math.floor(Math.random() * 5) + 3,
                    habitsCompleted: Math.floor(Math.random() * 3) + 1,
                    totalFocusTime: Math.floor(Math.random() * 180) + 60
                },
                categoryDistribution: {
                    Work: Math.floor(Math.random() * 50) + 20,
                    Health: Math.floor(Math.random() * 30) + 10,
                    Growth: Math.floor(Math.random() * 20),
                    Life: Math.floor(Math.random() * 20)
                },
                daySummary: `Automatically generated log for ${dateStr}`
            });
        }
        await Analytics.insertMany(analyticsDocs);

        console.log('✅ SEEDING COMPLETE');
        console.log(`User ID for Demo: ${userId.toString()}`);

    } catch (err) {
        console.error('❌ Seeding Error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

seedData();
