from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, internships, assistant, resume, interview

app = FastAPI(title="InternTrack AI", version="1.0.0")

# Revised CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://localhost:5175",
        "https://interntrack-ai-1-0czp.onrender.com",  # Added your production URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all your routers
app.include_router(auth.router, prefix="/auth")
app.include_router(internships.router, prefix="/internships")
app.include_router(assistant.router, prefix="/assistant")
app.include_router(resume.router, prefix="/resume")
app.include_router(interview.router, prefix="/interview")

@app.get("/")
def read_root():
    return {"message": "InternTrack API is running and connected!"}