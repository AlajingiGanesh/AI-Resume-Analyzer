# AI Resume Analyzer

AI Resume Analyzer is a full-stack web application that helps job seekers analyze, improve, and tailor their resumes using artificial intelligence.

It simulates how Applicant Tracking Systems (ATS) and recruiters evaluate resumes against job descriptions and provides actionable feedback.

## Features

- Upload and analyze resume PDFs  
- AI-powered resume rewriting  
- Skill gap roadmap generation  
- Mock interview with scoring  
- Career guidance chatbot  
- History tracking of analyses  
- Export results as PDF  

## Tech Stack

### Backend
- FastAPI (Python)  
- Groq / LLM APIs  
- PDF text extraction  

### Frontend
- HTML  
- CSS (Glassmorphism UI)  
- JavaScript  

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/AlajingiGanesh/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
---
2. Backend setup
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload
The backend will run at:
http://127.0.0.1:8000

3. Frontend setup
Open this file in your browser:
frontend/index.html

Project Structure
AI-Resume-Analyzer/
│
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── js/
│
├── requirements.txt
├── .gitignore
└── README.md
Use Cases
Students preparing for placements

Freshers applying for jobs

Resume optimization

Interview preparation

Career planning

Future Improvements
User authentication system

Cloud deployment

Resume templates

Job recommendation engine

Analytics dashboard

Author
Ganesh Alajingi

License
This project is licensed under the Apache 2.0 License.
