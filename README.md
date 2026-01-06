# Smart AI Notes - Syllabus Management System

A web-based application for managing syllabus content with AI-powered assistance for students.

## Features

### For Staff:
- Upload syllabus files (PDF, DOCX, Images)
- Organize content by units
- View uploaded files

### For Students:
- View syllabus content by units
- Open and read uploaded files
- AI-powered chatbot for questions
- Generate quiz questions
- Content summarization
- Search functionality

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **AI:** OpenAI GPT-4o-mini
- **File Processing:** PDF.js, Mammoth.js

## Quick Setup & Run

### Prerequisites
- Node.js 16+
- npm
- OpenAI API Key

### Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set up OpenAI API Key:**
   - Create a `.env` file in the project root
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

3. **Run the Application:**

   Start the backend server:
   ```bash
   npm start
   ```
   Backend runs on http://localhost:5000

   In a new terminal, start the frontend:
   ```bash
   python -m http.server 8000
   ```
   Frontend runs on http://localhost:8000

4. **Access the Application:**
   - Open http://localhost:8000/student/syllabus.html in your browser

### Alternative Run Methods

#### Method 1: Using Python HTTP Server (Frontend Only)
```bash
python -m http.server 8000
```
Then open http://localhost:8000/student/syllabus.html

#### Method 2: Using Express Backend Only
```bash
npm start
```
Backend runs on http://localhost:5000

#### Method 3: Using Setup Scripts
- Windows: Double-click `setup.bat` or run `.\setup.bat`
- PowerShell: Run `.\setup.ps1`

## Project Structure

```
smart-ai-notes/
├── index.html                 # Main landing page
├── server.js                  # Express API server
├── package.json               # Node.js dependencies
├── .env                       # Environment variables
├── js/
│   ├── auth.js               # Authentication logic
│   ├── staff.js              # Staff functionality
│   └── student.js            # Student functionality
├── staff/
│   ├── dashboard.html        # Staff dashboard
│   ├── syllabus.html         # Staff syllabus view
│   └── upload.html           # File upload page
├── student/
│   ├── dashboard.html        # Student dashboard
│   ├── syllabus.html         # Student syllabus view
│   └── ai.html               # AI chatbot interface
└── uploads/                  # File storage directories
    ├── unit1/
    ├── unit2/
    ├── unit3/
    └── unit4/
```

## Usage Instructions

### For Staff:
id - staff   pass - 1234
1. Login as staff
2. Go to Upload page
3. Select unit and upload files
4. Files are stored locally

### For Students:
id - student  pass - 1234
1. Login as student
2. View syllabus units
3. Click on unit names to open files
4. Use AI assistant for help

## API Endpoints

- `POST /api/chat` - AI chat functionality
- `POST /api/generate-questions` - Generate quiz questions
- `POST /api/summarize` - Summarize content
- `POST /api/search` - Search content

## Notes

- Files are stored in browser localStorage as base64
- AI features require valid OpenAI API key
- Frontend works without backend for basic file viewing
- CORS enabled for cross-origin requests

## Troubleshooting

1. **"Module not found" errors:** Run `npm install`
2. **"API key not set" errors:** Check your `.env` file
3. **Port conflicts:** Change ports in server.js
4. **File upload issues:** Check file type support (PDF, DOCX, Images)

## License

This project is for educational purposes.

