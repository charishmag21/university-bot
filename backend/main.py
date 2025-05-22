from backend.agents.search_agent import search_google
from backend.agents.summary_agent import summarize_search_results
from fastapi import FastAPI

app = FastAPI()
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
