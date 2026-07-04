from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.ai.ai_service import chat_with_ai
from app.services.auth_dependencies import get_current_user
from app.models.user import User
import PyPDF2, io, json, re

router = APIRouter()

MAX_RESUME_BYTES = 5 * 1024 * 1024  # 5MB

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    contents = await file.read()
    if len(contents) > MAX_RESUME_BYTES:
        raise HTTPException(status_code=413, detail="File too large (5MB max)")

    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read PDF — is the file corrupted?")

    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() or ""

    prompt = f"""Analyze this resume for a college student seeking internships.
Resume: {text[:3000]}
Respond ONLY with JSON:
{{"score": <0-100>, "skills": [<found skills>], "missing_skills": [<missing skills>], "suggestions": [<5 suggestions>]}}"""

    response = await chat_with_ai([{"role": "user", "content": prompt}])
    try:
        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            return json.loads(match.group())
    except:
        pass
    return {"score": 70, "skills": ["Python", "Communication"], "missing_skills": ["Docker", "AWS"], "suggestions": ["Add metrics", "Add GitHub link", "Add summary", "Use action verbs", "Tailor to each job"]}