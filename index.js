const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Record the exact second the bot starts up
const botStartTime = Math.floor(Date.now() / 1000);

// ==========================================
// 1. INITIALIZE WHATSAPP CLIENT
// ==========================================
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        pipe: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--disable-gpu',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-site-isolation-trials'
        ]
    }
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// 2. LOAD YOUR LOCAL KNOWLEDGE BASE
// ==========================================
let knowledgeBase = "";
try {
    const filePath = path.join(__dirname, 'knowledge_base.txt');
    knowledgeBase = fs.readFileSync(filePath, 'utf8');
    console.log("📚 Knowledge base loaded successfully!");
} catch (err) {
    console.log("⚠️ Warning: knowledge_base.txt not found. Running without custom memory.");
}

let currentMouseX = 100;
let currentMouseY = 100;

// ==========================================
// 3. HUMAN MOUSE SIMULATION ENGINE
// ==========================================
async function moveMouseLikeHuman(page, toX, toY) {
    const steps = 15 + Math.floor(Math.random() * 15);
    const fromX = currentMouseX;
    const fromY = currentMouseY;

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const wobbleX = Math.sin(t * Math.PI) * (Math.random() * 20 - 10);
        const wobbleY = Math.sin(t * Math.PI) * (Math.random() * 20 - 10);
        const nextX = fromX + (toX - fromX) * t + wobbleX;
        const nextY = fromY + (toY - fromY) * t + wobbleY;

        await page.mouse.move(nextX, nextY);
        await sleep(10 + Math.random() * 15);
    }
    currentMouseX = toX;
    currentMouseY = toY;
}

async function clickLikeHuman(page) {
    await page.mouse.down();
    await sleep(50 + Math.random() * 100);
    await page.mouse.up();
}

// ==========================================
// 4. MESSAGE QUEUE & DOUBLE-TEXT SHIELD MAPS
// ==========================================
const messageQueue = [];
let isProcessingQueue = false;
const activeBuffers = {};

// ==========================================
// 5. QR CODE & READY EVENTS
// ==========================================
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with your WhatsApp app to log in!');
});

client.on('ready', () => {
    console.log('🚀 Your Ultimate Human-Like WhatsApp Agent is online!');
});

// ==========================================
// 6. UPGRADED LISTENER (TEXT ONLY & POST-STARTUP ONLY)
// ==========================================
client.on('message_create', async (msg) => {
    // 1. Ignore messages sent by yourself
    if (msg.fromMe) return;

    // 2. Ignore WhatsApp status/story updates
    if (msg.isStatus) return;

    // 3. Ignore past messages or calls from before the bot started
    if (msg.timestamp < botStartTime) return;

    // 4. Only accept real text messages (ignores missed calls, call logs, audio, media)
    if (msg.type !== 'chat') {
        console.log(`🛡️ [Filter] Ignored non-text event of type: "${msg.type}" from ${msg.from}`);
        return;
    }

    // 5. Ignore blank or whitespace-only messages
    if (!msg.body || msg.body.trim() === "") return;

    // 6. Process only individual chats (@c.us and @lid)
    if (msg.from.endsWith('@c.us') || msg.from.endsWith('@lid')) {
        const sender = msg.from;

        console.log(`📡 [Valid New Text] From: ${sender} | Text: "${msg.body}"`);

        if (!activeBuffers[sender]) {
            activeBuffers[sender] = {
                messages: [],
                timeoutId: null
            };
        }

        activeBuffers[sender].messages.push(msg.body);
        console.log(`📥 [Queue] Buffered message from ${sender}: "${msg.body}"`);

        if (activeBuffers[sender].timeoutId) {
            clearTimeout(activeBuffers[sender].timeoutId);
        }

        activeBuffers[sender].timeoutId = setTimeout(() => {
            const combinedBody = activeBuffers[sender].messages.join(" [and then said] ");
            console.log(`🧩 [Queue] Combined buffer for ${sender}: "${combinedBody}"`);

            messageQueue.push({
                msgObj: msg,
                bodyText: combinedBody
            });

            delete activeBuffers[sender];
            processQueue();
        }, 5000);
    }
});

// ==========================================
// 7. MESSAGE QUEUE PROCESSOR (SEQUENTIAL)
// ==========================================
async function processQueue() {
    if (isProcessingQueue) return;
    isProcessingQueue = true;

    while (messageQueue.length > 0) {
        const currentTask = messageQueue.shift();
        try {
            await handleIncomingMessage(currentTask.msgObj, currentTask.bodyText);
        } catch (error) {
            console.error("❌ Error handling message:", error.message);
        }

        const restDelay = Math.floor(Math.random() * 4000) + 6000;
        console.log(`⏱️ Resting for ${restDelay / 1000} seconds before helping the next person...`);
        await sleep(restDelay);
    }

    isProcessingQueue = false;
}

// ==========================================
// 8. HUMAN-LIKE REPLY & TYPO ENGINE
// ==========================================
async function handleIncomingMessage(msg, combinedBodyText) {
    const chat = await msg.getChat();
    const page = client.pupPage;

    if (page) {
        try {
            const randomInputX = 500 + Math.floor(Math.random() * 200);
            const randomInputY = 700 + Math.floor(Math.random() * 50);
            await moveMouseLikeHuman(page, randomInputX, randomInputY);
            await clickLikeHuman(page);
        } catch (mouseErr) {
            console.log("⚠️ Mouse focus step skipped.");
        }
    }

    let thinkingDelay = 3000 + (combinedBodyText.length * 10);
    thinkingDelay = Math.min(thinkingDelay, 10000);
    thinkingDelay += Math.floor(Math.random() * 2000);
    console.log(`⏱️ Thinking delay calculated: ${thinkingDelay / 1000}s...`);
    await sleep(thinkingDelay);

    const systemPrompt = `
You are speaking strictly on my behalf. Write like a casual human chatting on a phone.
CRITICAL INSTRUCTION 1: You must ONLY answer using the facts provided in my custom Knowledge Base below. Do NOT use the internet, do NOT make up or assume anything, and do NOT use external information.
CRITICAL INSTRUCTION 2: If the answer cannot be found inside the Knowledge Base below, reply strictly with: "I'm sorry, I don't have that information right now." Do not try to write anything else.

My Knowledge Base:
"${knowledgeBase.substring(0, 4000)}"

User's message: "${combinedBodyText}"
Your reply:`;

    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3',
            prompt: systemPrompt,
            stream: false
        });

        let replyText = response.data.response.trim();

        replyText = replyText.toLowerCase();
        if (replyText.endsWith('.')) {
            replyText = replyText.slice(0, -1);
        }

        await chat.sendStateTyping();

        let typingDuration = replyText.length * 180;
        typingDuration = Math.max(typingDuration, 3000);
        typingDuration = Math.min(typingDuration, 12000);

        console.log(`⌨️ Simulating human typing speed for ${typingDuration / 1000}s...`);
        await sleep(typingDuration);

        if (page) {
            try {
                const sendButtonX = 850 + Math.floor(Math.random() * 50);
                const sendButtonY = 700 + Math.floor(Math.random() * 50);
                await moveMouseLikeHuman(page, sendButtonX, sendButtonY);
            } catch (mouseErr) {
                // Fail-safe
            }
        }

        const triggerTypo = Math.random() < 0.05 && replyText.length > 8;

        if (triggerTypo) {
            const textArray = replyText.split('');
            const swapIdx = Math.floor(Math.random() * (textArray.length - 4)) + 2;
            const temp = textArray[swapIdx];
            textArray[swapIdx] = textArray[swapIdx + 1];
            textArray[swapIdx + 1] = temp;
            const typoText = textArray.join('');

            await msg.reply(typoText);
            console.log(`📤 Typo sent: "${typoText}"`);

            await sleep(2000 + Math.random() * 1000);

            const originalWords = replyText.split(' ');
            const typoWords = typoText.split(' ');
            let correction = "";
            for (let i = 0; i < originalWords.length; i++) {
                if (originalWords[i] !== typoWords[i]) {
                    correction = originalWords[i] + "*";
                    break;
                }
            }
            if (!correction) correction = replyText + "*";

            await chat.sendMessage(correction);
            console.log(`📤 Correction sent: "${correction}"`);
        } else {
            await msg.reply(replyText);
            console.log(`📤 Clean reply sent: "${replyText}"`);
        }

        await chat.clearState();

    } catch (err) {
        console.error("❌ Ollama error:", err.message);
        await chat.clearState();
    }
}

client.initialize();


