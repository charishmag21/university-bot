from backend.agents.together_agent import summarize_with_together

# def summarize_search_results(query, results):
#     combined = "\n".join(
#         f"{r['title']} - {r['link']}\n{r['snippet']}" for r in results
#     )
#     prompt = f"Based on the following search results, answer this question:\n\n{query}\n\n---\n\n{combined}"
#     return summarize_with_together(prompt)

def summarize_search_results(query, results):
    if results:
        # (current behavior, use sources)
        sources_str = "\n".join([f"{r['title']}: {r['snippet']}" for r in results])
        prompt = f"User asked: {query}\nRelevant info:\n{sources_str}\n\nAnswer as UniBot:"
    else:
        # No sources, be conversational and human
        prompt = (
            f"User asked: {query}\n\n"
            "No search results were found. Please answer in a friendly, conversational, and human way, as UniBot, drawing from general knowledge and helpfulness."
        )
    return summarize_with_together(prompt)

