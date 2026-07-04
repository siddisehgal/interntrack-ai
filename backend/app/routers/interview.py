from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.ai.ai_service import chat_with_ai
from app.services.auth_dependencies import get_current_user
from app.models.user import User
import json, re

router = APIRouter()

class FeedbackRequest(BaseModel):
    question: str
    answer: str

@router.post("/feedback")
async def get_feedback(req: FeedbackRequest, current_user: User = Depends(get_current_user)):
    prompt = f"""Evaluate this interview answer.
Question: {req.question}
Answer: {req.answer}
Respond ONLY with JSON:
{{"score": <0-100>, "strengths": [<3 strengths>], "improvements": [<3 improvements>], "sample": "<suggested approach>"}}"""

    response = await chat_with_ai([{"role": "user", "content": prompt}])
    try:
        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            return json.loads(match.group())
    except:
        pass
    return {"score": 75, "strengths": ["Good structure", "Clear", "Relevant"], "improvements": ["Add metrics", "Be concise", "Include outcome"], "sample": "Use the STAR method: Situation, Task, Action, Result."}