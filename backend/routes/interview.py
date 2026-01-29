from fastapi import APIRouter, UploadFile, File, HTTPException
from services.groq_service import ask_groq
from services.pdf_service import extract_resume_text
from utils.json_parser import safe_json_parse
from pydantic import BaseModel
from typing import List
from fastapi import Form

# ===== MODELS =====

class MCQ(BaseModel):
    q: str
    options: List[str]
    answer: str

class QA(BaseModel):
    q: str
    answer: str

class InterviewResponse(BaseModel):
    mcq: List[MCQ]
    logical: List[QA]
    behavioral: List[QA]
    technical: List[QA]
# ===== ROUTER =====

router = APIRouter()

# ===== AI GENERATOR =====

def get_mock_interview(resume, jd):
    prompt = f"""
You are an expert technical interviewer.

Generate EXACTLY 10 interview questions for this candidate.

Resume:
{resume}

Job Description:
{jd}

Return JSON ONLY in this exact format:

{{
  "mcq": [
    {{
      "q": "Question?",
      "options": ["A","B","C","D"],
      "answer": "B"
    }}
  ],
  "logical": [
    {{
      "q": "Logical question?",
      "answer": "Correct logical answer"
    }}
  ],
  "behavioral": [
    {{
      "q": "Behavioral question?",
      "answer": "Ideal behavioral answer"
    }}
  ],
  "technical": [
    {{
      "q": "Technical question?",
      "answer": "Ideal technical answer"
    }}
  ]
}}

Rules:
- mcq must be 4
- logical must be 2
- behavioral must be 2
- technical must be 2
- Total exactly 10

ONLY return JSON.
"""
    return ask_groq(prompt)

# ===== ENDPOINT =====

@router.post("/interview", response_model=InterviewResponse)
async def mock_interview(
    file: UploadFile = File(...),
    job_desc: str = Form(...)
):
    try:
        resume_text = extract_resume_text(file)
        interview = get_mock_interview(resume_text, job_desc)
        return safe_json_parse(interview)
    except Exception as e:
        print("INTERVIEW ERROR:", e)
        raise HTTPException(500, "Mock interview failed")