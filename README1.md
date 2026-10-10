# User Manual

 # Local WhatsApp AI Agent (Humanized & Offline)

An autonomous WhatsApp AI agent that runs completely on your local machine using **Node.js**, **whatsapp-web.js**, and a local **Ollama (Llama 3)** instance. No conversation data ever leaves your computer.

---

## 🌟 Features

- **100% Local & Private:** Powered by Ollama; no third-party APIs or external cloud keys required.
- **Knowledge Base RAG:** Speaks strictly from facts provided in `knowledge_base.txt`.
- **Anti-Ban Guardrails:**
  - **Dynamic Typing Simulation:** Calculates realistic typing pauses (~180ms per character).
  - **Pace-Matched Thinking Delays:** Scales reading delay based on incoming message length.
  - **Virtual Mouse Engine:** Generates Bézier curve mouse paths with random jitter before clicking.
  - **Double-Text Shield:** Gathers multiple messages sent within 5 seconds into a single prompt.
  - **Typo Engine:** Introduces a 5% chance of realistic spelling mistakes followed by asterisk corrections.
  - **Strict Event Filtering:** Drops non-text events (missed calls, videos, voice notes, stickers, and status updates).
  - **Startup Time Gating:** Ignores any messages or call history received before the bot booted up.

---

## 📋 Prerequisites

1. **Operating System:** Windows 10/11, macOS, or Linux.
2. **Node.js:** v18.0.0 or higher ([Download Node.js](https://nodejs.org/)).
3. **Ollama:** Installed and running locally ([Download Ollama](https://ollama.com/)).
4. **AI Model:** Llama 3 model downloaded via command line:
   ```bash
   ollama run llama3

🚀 Installation & Setup


1. Clone the Repository
git clone https://github.com/your-username/whatsapp-ai-agent.git
cd whatsapp-ai-agent
2. Install Dependencies
Install the required packages along with the GitHub main tarball of whatsapp-web.js to ensure compatibility with modern WhatsApp Web builds:
npm install qrcode-terminal axios
npm install https://github.com/pedroslopez/whatsapp-web.js/tarball/main
npx puppeteer browsers install chrome
3. Configure the Knowledge Base
Create a file named knowledge_base.txt in the root folder and define your personality and facts:
=========================================
SECTION 1: MY IDENTITY & FACTS
=========================================
- My name is: John Doe
- Location: New York
- Occupation: Software Engineer

=========================================
SECTION 2: WRITING STYLE RULES
=========================================
- Always reply in lowercase letters.
- Never use ending periods.
- Keep responses short and casual.

=========================================
SECTION 3: EXAMPLE CHATS
=========================================
Friend: hey are you free today?
Me: busy with coding today maybe tomorrow

🏃 Running the Bot
Ensure Ollama is running in the background (check your system tray or run ollama serve).

Start the Node.js application:
node index.js

A QR code will display in your terminal (and a Chrome window will appear if headless: false).

Open WhatsApp on your phone:

Navigate to Settings > Linked Devices > Link a Device.

Scan the QR code.

Once logged in, the terminal will log:
🚀 Your Ultimate Human-Like WhatsApp Agent is online!

🛠️ Troubleshooting
Issue	Solution
EBUSY: resource busy or locked	Terminate background Chrome and Node processes:
taskkill /F /IM chrome.exe
taskkill /F /IM node.exe
Then delete .wwebjs_auth.
Cannot find module index.js	Ensure file extensions are visible in your file explorer and verify the file is not named index.js.txt.
auth timeout	Ensure authTimeoutMs: 0 is set in the Client configuration to allow large chat histories to finish syncing.


⚠️ Disclaimer
This project uses an unofficial automation library (whatsapp-web.js) and interacts with WhatsApp Web via Puppeteer. Use of automated bots violates WhatsApp's Terms of Service. Always test using a secondary number. The creators and contributors are not responsible for any account bans or suspensions.

