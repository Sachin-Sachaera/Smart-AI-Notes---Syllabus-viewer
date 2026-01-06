# Manual Setup Guide - Smart AI Notes

## Problem: "Could not connect to AI service. Make sure the backend is running."

This error means the AI backend server isn't running. Follow these steps to fix it:

## Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the LTS version (recommended)
3. Run the installer
4. **IMPORTANT**: Make sure npm is included in the installation
5. Restart your computer after installation

## Step 2: Install Dependencies

Open Command Prompt or PowerShell and run:
```bash
npm install
```

## Step 3: Set up OpenAI API Key

1. Copy the `.env.example` file to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` in a text editor and replace `your_openai_api_key_here` with your actual OpenAI API key
   - Get your API key from: https://platform.openai.com/api-keys

## Step 4: Run the Application

1. Start the AI backend server:
   ```bash
   npm start
   ```
   Keep this terminal window open.

2. Open a new terminal and start the frontend:
   ```bash
   python -m http.server 8000
   ```

3. Open your browser and go to:
   http://localhost:8000/student/syllabus.html

## Alternative: Use the Automated Script

If you prefer automated setup, run:
```powershell
powershell -ExecutionPolicy Bypass -File set-env.ps1
```

## Testing the AI Features

1. Click on syllabus units to load content
2. Click "🤖 Ask AI Assistant"
3. Try these features:
   - Type questions in the chat
   - Click "📝 Generate Questions"
   - Click "📋 Summarize"
   - Click "🔍 Search" and enter a search term

## Troubleshooting

- **"node not found"**: Make sure Node.js is installed and added to PATH
- **"Module not found"**: Run `npm install`
- **"API key error"**: Check that your OpenAI API key is correctly set in `.env`
- **Port already in use**: Close other applications using port 5000 or 8000

## Need Help?

If you continue having issues, please share:
1. The exact error message
2. Your operating system
3. Whether Node.js is installed (run `node --version`)
