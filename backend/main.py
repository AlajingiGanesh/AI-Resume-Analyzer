from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.analyze import router as analyze_router
from routes.rewrite import router as rewrite_router
from routes.roadmap import router as roadmap_router
from routes.interview import router as interview_router
from routes.chat import router as chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)
app.include_router(rewrite_router)
app.include_router(roadmap_router)
app.include_router(interview_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {"status": "AI Resume Analyzer API running"}
