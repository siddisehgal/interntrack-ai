from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.ai.ai_service import chat_with_ai
from app.services.auth_dependencies import get_current_user
from app.models.user import User

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []

@router.post("/chat")
async def chat(req: ChatRequest, current_user: User = Depends(get_current_user)):
    system_prompt = """You are an expert AI career assistant for college students seeking internships. 
    Help with resume advice, interview preparation, career guidance, and internship strategies.
    Be concise, practical, and encouraging."""
    
    messages = [{"role": "system", "content": system_prompt}]
    for msg in req.history[-6:]:
        if msg.get("role") in ["user", "assistant"]:
            messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": req.message})
    
    reply = await chat_with_ai(messages)
    return {"reply": reply}