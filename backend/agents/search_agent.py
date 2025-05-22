import requests
from backend.tools.config import SERPER_API_KEY

def search_google(query, num_results=5):
    """
    Uses Serper.dev to perform a Google search.
    Returns a list of dictionaries containing title, link, and snippet.
    """
    url = "https://google.serper.dev/search"
    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "q": query
    }

    response = requests.post(url, headers=headers, json=payload)
    if response.status_code != 200:
        raise Exception(f"Serper API error: {response.status_code} - {response.text}")

    data = response.json()
    organic_results = data.get("organic", [])[:num_results]

    results = []
    for item in organic_results:
        result = {
            "title": item.get("title"),
            "link": item.get("link"),
            "snippet": item.get("snippet")
        }
        results.append(result)

    return results
