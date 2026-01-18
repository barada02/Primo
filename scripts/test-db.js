// scripts/test-db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
// We go up one level since we are in /scripts
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('--- DB Test Script ---');
console.log('URI:', process.env.MONGODB_URI ? 'Found (Hidden)' : 'NOT FOUND');

if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is undefined. Check your .env file.');
    process.exit(1);
}

const testSchema = new mongoose.Schema({
    name: String,
    role: String,
    timestamp: { type: Date, default: Date.now }
});

const TestModel = mongoose.model('ConnectionTest', testSchema);

async function runTest() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected successfully!');

        console.log('Creating test document...');
        const doc = await TestModel.create({
            name: 'Primo User',
            role: 'Tester'
        });
        console.log('✅ Document created:', doc._id.toString());

        console.log('Reading document...');
        const found = await TestModel.findById(doc._id);
        console.log('✅ Document found:', found.name);

        console.log('Deleting test document...');
        await TestModel.findByIdAndDelete(doc._id);
        console.log('✅ Document deleted.');

        console.log('🎉 CRUD Test Passed!');
    } catch (err) {
        console.error('❌ Connection or DB Error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

runTest();
