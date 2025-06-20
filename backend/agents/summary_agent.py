from backend.agents.together_agent import summarize_with_together

# def summarize_search_results(query, results):
#     combined = "\n".join(
#         f"{r['title']} - {r['link']}\n{r['snippet']}" for r in results
#     )
#     prompt = f"Based on the following search results, answer this question:\n\n{query}\n\n---\n\n{combined}"
#     return summarize_with_together(prompt)

from backend.agents.together_agent import summarize_with_together

def summarize_search_results(query, results):
    if results:
        sources_str = "\n".join([f"{r['title']}: {r['snippet']}" for r in results])
        prompt = (
            f"The user asked about a university/campus:\n"
            f"{query}\n\n"
            f"Relevant info:\n{sources_str}\n\n"
            f"Answer as UniBot for the university/campus mentioned above:"
        )
    else:
        prompt = (
            f"The user asked about a university/campus:\n"
            f"{query}\n\n"
            "No search results were found. Please answer as UniBot in a friendly, conversational way, specific to the mentioned university and campus/city if possible."
        )
    return summarize_with_together(prompt)
