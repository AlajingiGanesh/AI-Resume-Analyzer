# 🤖 AI Resume Analyzer

An intelligent full-stack web application that analyzes resumes using AI, provides skill gap insights, rewrites resumes, generates learning roadmaps, and conducts mock interviews.

Built to help students and job seekers improve their resumes and prepare for placements.

---

## 🚀 Features

- **Resume Analysis**
  - AI-based resume scoring
  - Match percentage with job description
  - Skill gaps, ATS tips, and improvement suggestions

- **AI Resume Rewriter**
  - Professional summary generation
  - Experience and skills optimization
  - Final polished resume output

- **Skill Learning Roadmap**
  - Short-term, medium-term, and long-term learning paths

- **Mock Interview Module**
  - MCQ + descriptive questions
  - Instant feedback and score
  - Final answer review

- **PDF Export**
  - Download analysis and rewritten resume as PDF

- **AI Chatbot (JARVIS)**
  - Career guidance assistant

---

## 🧠 Tech Stack

### Frontend
- HTML5  
- CSS3 (Glassmorphism UI)  
- JavaScript (Vanilla)

### Backend
- FastAPI (Python)
- Groq LLM API
- PDFMiner
- Sentence Transformers

### Deployment
- Vercel (Full-stack)

---

## 📂 Project Structure

AI-Resume-Analyzer/
│
├── backend/
│ ├── main.py
│ ├── routes/
│ ├── services/
│ └── utils/
│
├── index.html
├── style.css
├── js/
│
├── requirements.txt
├── vercel.json
└── README.md


---

## ⚙️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/AlajingiGanesh/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer

---

2. Backend setup
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload
Backend runs at:

http://127.0.0.1:8000

---

3. Frontend setup
Open in browser:

index.html
🌐 Live Demo
Deployed on Vercel:
https://ai-resume-analyzer.vercel.app
(Replace with your actual final link)

---

🎯 Use Cases
Students preparing for placements

Freshers improving resumes

Career switchers

Internship applicants

🔒 Environment Variables
Create a .env file in backend:

GROQ_API_KEY=your_api_key_here

---

📈 Future Enhancements
User authentication

Resume history dashboard

Resume version comparison

Multi-language support

---

👨‍💻 Author
Ganesh Alajingi
Full Stack Developer
GitHub: https://github.com/AlajingiGanesh

---

📜 License
This project is licensed under the Apache 2.0 License.


---
