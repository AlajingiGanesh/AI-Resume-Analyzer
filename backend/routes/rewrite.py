from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from services.groq_service import ask_groq
from services.pdf_service import extract_resume_text
from utils.json_parser import safe_json_parse
from pydantic import BaseModel

class RewriteResponse(BaseModel):
    summary: str
    experience: list[str]
    skills: list[str]
    final_resume: str

router = APIRouter()

def get_rewritten_resume(resume, jd):
    prompt = f"""
You are an expert resume writer.

Return strictly JSON:

{{
  "summary": "...",
  "experience": ["..."],
  "skills": ["..."],
  "final_resume": "..."
}}

Resume:
{resume}

Job Description:
{jd}
"""
    return ask_groq(prompt)

@router.post("/rewrite", response_model=RewriteResponse)
async def rewrite_resume(
    file: UploadFile = File(...),
    job_desc: str = Form(...)
):
    try:
        resume_text = extract_resume_text(file)
        rewritten = get_rewritten_resume(resume_text, job_desc)
        return safe_json_parse(rewritten)
    except Exception as e:
        print("REWRITE ERROR:", e)
        raise HTTPException(500, "Resume rewrite failed")
