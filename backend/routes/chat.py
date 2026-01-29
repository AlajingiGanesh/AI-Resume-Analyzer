from fastapi import APIRouter
from pydantic import BaseModel
from services.groq_service import ask_groq

class ChatResponse(BaseModel):
    reply: str

router = APIRouter()

class ChatReq(BaseModel):
    message: str

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatReq):
    prompt = f"You are JARVIS, an AI resume assistant.\nUser: {req.message}"
    reply = ask_groq(prompt)
    return {"reply": reply}
