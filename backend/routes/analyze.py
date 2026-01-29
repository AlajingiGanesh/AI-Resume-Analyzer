from fastapi import APIRouter, UploadFile, File, HTTPException
from services.groq_service import ask_groq
from services.pdf_service import extract_resume_text
from utils.json_parser import safe_json_parse
from pydantic import BaseModel


class AnalyzeResponse(BaseModel):
    score: int
    match_percent: int
    skill_gaps: list[str]
    ats_tips: list[str]
    suggestions: list[str]


router = APIRouter()

def get_ai_report(resume, jd):
    prompt = f"""
You are a professional ATS and Resume Evaluator.

Return strictly JSON:

{{
  "score": number between 0 and 100,
  "skill_gaps": ["..."],
  "ats_tips": ["..."],
  "suggestions": ["..."]
}}

Resume:
{resume}

Job Description:
{jd}
"""
    return ask_groq(prompt)


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_resume(file: UploadFile = File(...), job_desc: str = ""):
    try:
        resume_text = extract_resume_text(file)
        report_json = get_ai_report(resume_text, job_desc)
        parsed = safe_json_parse(report_json)

        return {
            "score": parsed["score"],
            "match_percent": parsed["score"],
            "skill_gaps": parsed["skill_gaps"],
            "ats_tips": parsed["ats_tips"],
            "suggestions": parsed["suggestions"]
        }

    except Exception as e:
        raise HTTPException(500, "Resume analysis failed")
