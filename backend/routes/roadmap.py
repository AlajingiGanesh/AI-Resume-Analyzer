from fastapi import APIRouter, UploadFile, File, HTTPException
from services.groq_service import ask_groq
from services.pdf_service import extract_resume_text
from utils.json_parser import safe_json_parse
from pydantic import BaseModel


class RoadmapResponse(BaseModel):
    short_term: list[str]
    medium_term: list[str]
    long_term: list[str]


router = APIRouter()

def get_skill_roadmap(resume, jd):
    prompt = f"""
You are a career coach.

Return strictly JSON:

{{
  "short_term": ["..."],
  "medium_term": ["..."],
  "long_term": ["..."]
}}

Only skills.

Resume:
{resume}

Job Description:
{jd}
"""
    return ask_groq(prompt)

@router.post("/roadmap", response_model=RoadmapResponse)
async def skill_roadmap(file: UploadFile = File(...), job_desc: str = ""):
    try:
        resume_text = extract_resume_text(file)
        roadmap = get_skill_roadmap(resume_text, job_desc)
        return safe_json_parse(roadmap)
    except:
        raise HTTPException(500, "Roadmap generation failed")
