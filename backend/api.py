# # backend/api.py
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi import FastAPI
# from pydantic import BaseModel
# from backend.agents.search_agent import search_google
# from backend.agents.summary_agent import summarize_search_results
# from backend.memory.session_memory import get_history, add_message  # NEW: import memory functions

# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class QueryInput(BaseModel):
#     query: str
#     session_id: str

# def format_prompt_with_history(history, user_query):
#     prompt = ""
#     for msg in history:
#         if msg["role"] == "user":
#             prompt += f"User: {msg['content']}\n"
#         else:
#             prompt += f"UniBot: {msg['content']}\n"
#     prompt += f"User: {user_query}\nUniBot:"
#     return prompt

# @app.post("/ask")
# def ask_bot(data: QueryInput):
#     # Store user message
#     add_message(data.session_id, "user", data.query)

#     # Get previous chat history
#     history = get_history(data.session_id)

#     # Compose prompt with history
#     prompt = format_prompt_with_history(history[:-1], data.query)

#     # Run Google Search as usual
#     results = search_google(data.query)

#     # Pass prompt and results for summary (modify summary_agent if needed)
#     summary = summarize_search_results(prompt, results)

#     # Store assistant response
#     add_message(data.session_id, "assistant", summary)

#     return {
#         "summary": summary,
#         "sources": results
#     }



from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from backend.agents.search_agent import search_google
from backend.agents.summary_agent import summarize_search_results
from backend.memory.session_memory import get_history, add_message

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

def format_prompt_with_history(history, user_query):
    prompt = ""
    for msg in history:
        if msg["role"] == "user":
            prompt += f"User: {msg['content']}\n"
        else:
            prompt += f"UniBot: {msg['content']}\n"
    prompt += f"User: {user_query}\nUniBot:"
    return prompt

# 🔥 NEW: Helper to auto-add "Northeastern University Toronto"
def ensure_university_context(query):
    lowered = query.lower()
    university_keywords = ["northeastern", "university", "college", "school", "campus"]
    if not any(word in lowered for word in university_keywords):
        return f"{query} Northeastern University Toronto"
    return query

@app.post("/ask")
def ask_bot(data: QueryInput):
    # Store user message
    add_message(data.session_id, "user", data.query)

    # Get previous chat history
    history = get_history(data.session_id)

    # Compose prompt with history
    prompt = format_prompt_with_history(history[:-1], data.query)

    # 🔥 Use the helper here
    search_query = ensure_university_context(data.query)
    results = search_google(search_query)

    # Pass prompt and results for summary (modify summary_agent if needed)
    summary = summarize_search_results(prompt, results)

    # Store assistant response
    add_message(data.session_id, "assistant", summary)

    return {
        "summary": summary,
        "sources": results
    }

@app.get("/")
def root():
    return {"message": "University Bot Backend is Running!"}

# Add this route for health check
@app.get("/health")
def health():
    return {"status": "ok"}