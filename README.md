# ResumeAI India 🇮🇳

AI-powered Resume Builder for Indian job seekers.
Supports English, मराठी, and हिंदी.

## Features
- 3 Resume Templates (Classic, Modern, Minimal)
- Cover Letter Generator
- LinkedIn Bio Generator
- PDF Download
- Multilingual (English / मराठी / हिंदी)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm start
```

### 3. Deploy to Vercel

1. Push this folder to GitHub
2. Go to vercel.com → Import project
3. Add Environment Variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from console.anthropic.com
4. Click Deploy ✅

## Folder Structure
```
resumeai-india/
├── api/
│   └── generate.js     ← Backend (API key safe here)
├── src/
│   ├── App.js          ← Main React app
│   └── index.js
├── public/
│   └── index.html
├── vercel.json
├── package.json
└── README.md
```
