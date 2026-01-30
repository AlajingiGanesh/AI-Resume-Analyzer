# 🤖 AI Resume Analyzer

An intelligent full-stack web application that helps job seekers analyze, improve, and optimize their resumes using AI.

Live Demo:  
👉 https://alajingiganesh.github.io/AI-Resume-Analyzer/

Backend API:  
👉 https://ai-resume-analyzer-icxy.onrender.com/docs

---

## 🚀 Features

- 📄 Upload resume (PDF)
- 🧠 AI-powered resume analysis
- ✍️ Resume rewriting with professional tone
- 📊 Skill gap & ATS optimization tips
- 🗺️ Personalized skill learning roadmap
- 🎤 AI mock interview with scoring
- 📜 PDF report export
- 🤖 Built-in AI chatbot (JARVIS)

---

## 🛠️ Tech Stack

### Frontend
- HTML, CSS, JavaScript
- Glassmorphism UI
- GitHub Pages (hosting)

### Backend
- FastAPI (Python)
- Groq LLM API
- Render (cloud deployment)

---



## 🏗️ Project Architecture

AI-Resume-Analyzer/
│
├── backend/
│ ├── main.py
│ ├── routes/
│ ├── services/
│ └── requirements.txt
│
├── js/
│ ├── main.js
│ ├── api.js
│ ├── analyze.js
│ ├── rewrite.js
│ ├── roadmap.js
│ ├── interview.js
│ └── chat.js
│
├── index.html
├── style.css
└── README.md



---

## ⚙️ How It Works

1. User uploads a resume and job description.
2. Frontend sends data to FastAPI backend.
3. Backend processes PDF and sends prompt to Groq AI.
4. AI response is returned and displayed in UI.
5. User can export results as a PDF.

---

## 🔐 Environment Setup (Backend)

Create a `.env` file or set environment variable:

GROQ_API_KEY=your_api_key_here


---

## ▶️ Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Frontend
Just open:

index.html
in your browser.

📌 Deployment
Frontend deployed on GitHub Pages

Backend deployed on Render

Environment variables securely managed on Render

📈 Future Enhancements
User authentication (login/register)

Resume history storage

Multi-language support

Payment integration for premium features

Resume templates

👨‍💻 Author
Ganesh Alajingi
Full Stack Developer | AI Enthusiast

GitHub: https://github.com/AlajingiGanesh

⭐ If you like this project
Give it a star ⭐ on GitHub – it really helps!


---
