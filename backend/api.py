# backend/api.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from backend.agents.search_agent import search_google
from backend.agents.summary_agent import summarize_search_results

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryInput(BaseModel):
    query: str
    session_id: str

@app.post("/ask")
def ask_bot(data: QueryInput):
    results = search_google(data.query)
    summary = summarize_search_results(data.query, results)
    return {
        "summary": summary,
        "sources": results
    }

