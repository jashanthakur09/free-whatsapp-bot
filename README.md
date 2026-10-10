# 🤖 WhatsApp Chatbot

A self-hosted WhatsApp automation bot built with **Node.js** and **whatsapp-web.js**.

---

## ✨ Features

- ⚡ **Automated Replies:** Responds instantly to incoming WhatsApp messages.
- 📱 **QR Code Login:** Connects smoothly using terminal QR code scan.
- 📁 **File & Media Delivery:** Sends documents, notes, and media directly to users.
- 🔒 **Privacy First:** Runs locally without third-party server exposure.

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Version 18 or newer recommended)
- [Git](https://git-scm.com/)
- An active WhatsApp account on your phone

---

## 🚀 Getting Started

Follow these steps to run the bot on your computer:

### 1. Clone the project
```bash
git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
cd <YOUR-REPO-NAME>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the bot
```bash
node index.js
```
*(or `npm start` if configured in package.json)*

---

### 🧠 Knowledge Base Setup
1. Copy the sample file:
   - On Windows: `copy knowledge_base_git.example.txt knowledge_base_git.txt`
   - On Mac/Linux: `cp knowledge_base_git.example.txt knowledge_base_git.txt`
2. Open `knowledge_base_git.txt` and add your custom questions and answers.


## 📱 How to Connect Your WhatsApp

1. Once you run the start command, a **QR code** will appear directly in your terminal.
2. Open **WhatsApp** on your phone.
3. Tap **Settings** (or the 3 dots on Android) ➔ **Linked Devices** ➔ **Link a Device**.
4. Point your camera at the terminal QR code to scan it.
5. Once authenticated, your terminal will log: `Bot is ready!`.

---

## 💬 Available Bot Commands

| Command | What it does |
|---|---|
| `!help` or `!menu` | Shows the list of all available commands |
| `!ping` | Checks if the bot is online |
| `!notes` | Sends study materials or resource files |

---

## ⚠️ Notes & Troubleshooting

- **Session Security:** Your session data is stored locally in `.wwebjs_auth/`. Never upload or share this folder.
- **Connection Drops:** Keep your phone connected to the internet during initial setup.
- If the QR code doesn't load or browser crashes, ensure Chrome/Chromium dependencies are installed on your OS.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
All rights reserved. Personal project by Jashan Thakur.

