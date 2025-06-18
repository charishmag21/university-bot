from backend.agents.search_agent import search_google
from backend.agents.summary_agent import summarize_search_results
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend dev/prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://candid-yeot-40275f.netlify.app",
        # Add other frontend URLs as needed
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "University Bot Backend is Running!"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/ask")
async def ask(request: Request):
    data = await request.json()
    query = data.get("query", "")
    university = data.get("university", "")
    campus = data.get("campus", "")

    # Compose context-rich query for search and LLM
    if university and campus:
        context_query = f"For {university}, campus/city: {campus}, {query}"
    elif university:
        context_query = f"For {university}, {query}"
    elif campus:
        context_query = f"For campus/city: {campus}, {query}"
    else:
        context_query = query

    # Debug: Print what we're doing
    print("🔍 University:", university)
    print("🔍 Campus:", campus)
    print("🔍 Query:", query)
    print("🔍 Context query sent to search agent:", context_query)

    results = search_google(context_query)
    print("🔍 Search results returned:", results)

    summary = summarize_search_results(context_query, results)

    # return {
    #     "results": results,
    #     "summary": summary
    # }
    return {
    "summary": summary,
    "sources": results,
    "results": results
    }
# CLI for dev testing (not for production/cloud)
def main():
    query = input("🔍 Enter your query: ")
    results = search_google(query)

    print("\nTop Results:")
    for idx, r in enumerate(results, start=1):
        print(f"\nResult {idx}")
        print(f"Title: {r.get('title')}")
        print(f"Link: {r.get('link')}")
        print(f"Snippet: {r.get('snippet')}")
    print("--" * 50)
    print("\n🤖 Generating AI Summary...")
    summary = summarize_search_results(query, results)
    print("\n✅ Final Answer:\n")
    print(summary)
