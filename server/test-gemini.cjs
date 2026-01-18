const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini() {
    const key = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    console.log("🔑 API Key found:", key ? "YES" : "NO");

    if (!key) {
        console.error("❌ No API Key found in server/.env");
        process.exit(1);
    }

    const models = ["gemini-flash-latest", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];

    for (const modelName of models) {
        console.log(`\n🤖 Testing Model: ${modelName}...`);
        try {
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: modelName });

            const result = await model.generateContent("Hi");
            const response = await result.response;
            console.log(`✅ SUCCESS with ${modelName}! Response: ${response.text()}`);
            return;
        } catch (error) {
            console.log(`❌ Failed with ${modelName}: ${error.message.split('[')[0]}`);
        }
    }
    console.error("\n❌ All models failed.");
}

testGemini();
