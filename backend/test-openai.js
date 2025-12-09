import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the current directory
console.log('📂 Loading .env file...');
const result = dotenv.config({ path: path.join(__dirname, '.env'), override: true });

if (result.error) {
    console.error('❌ Failed to load .env file:', result.error);
} else {
    console.log('✅ .env file loaded');
}

// Check key
const rawKey = process.env.OPENAI_API_KEY;
if (!rawKey) {
    console.error('❌ OPENAI_API_KEY is missing from process.env');
    process.exit(1);
}

const cleanedKey = rawKey.trim();
const maskedKey = `${cleanedKey.substring(0, 3)}...${cleanedKey.substring(cleanedKey.length - 4)}`;
console.log(`🔑 Key loaded: ${maskedKey}`);
console.log(`📏 Key length: ${cleanedKey.length} characters`);

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: cleanedKey
});

async function testConnection() {
    console.log('\n📡 Testing OpenAI connection...');
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: "Say hello." }],
            model: "gpt-3.5-turbo",
            max_tokens: 10,
        });

        console.log('✅ Success! OpenAI responded:');
        console.log('-----------------------------------');
        console.log(completion.choices[0].message.content);
        console.log('-----------------------------------');
    } catch (error) {
        console.error('\n❌ Connection Failed!');
        console.error('Error Code:', error.status || 'Unknown');
        console.error('Error Type:', error.code || 'Unknown');
        console.error('Full Message:', error.message);

        if (error.status === 401) {
            console.log('\n💡 Tip: A 401 error strictly means the key was rejected by OpenAI. Double check that the key in .env matches exactly what is in your dashboard.');
        }
    }
}

testConnection();
