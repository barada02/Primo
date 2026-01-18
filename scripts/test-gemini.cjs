const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });

async function testGemini() {
    const key = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    console.log("🔑 API Key found:", key ? "YES (starts with " + key.substring(0, 5) + "...)" : "NO");

    if (!key) {
        console.error("❌ No API Key found in server/.env");
        process.exit(1);
    }

    try {
        console.log("🤖 Connecting to Gemini...");
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "Hello! Are you online and working?";
        console.log(`📤 Sending prompt: "${prompt}"`);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("\n✅ SUCCESS! Response from AI:");
        console.log("-----------------------------");
        console.log(text);
        console.log("-----------------------------");

    } catch (error) {
        console.error("\n❌ FAILED. Error details:");
        console.error(error);
    }
}

testGemini();
