from backend.agents.together_agent import summarize_with_together

def summarize_search_results(query, results):
    combined = "\n".join(
        f"{r['title']} - {r['link']}\n{r['snippet']}" for r in results
    )
    prompt = f"Based on the following search results, answer this question:\n\n{query}\n\n---\n\n{combined}"
    return summarize_with_together(prompt)

# import re
# from backend.agents.together_agent import summarize_with_together

# def split_points(text):
#     # Split by newline+number or bullet (1., 2., -, •)
#     return [pt.strip() for pt in re.split(r'(?:\n\d+\.\s+|\n-\s+|\n•\s+)', text) if pt.strip()]

# def summarize_search_results(query, results):
#     combined = "\n".join(
#         f"{r['title']} - {r['link']}\n{r['snippet']}" for r in results
#     )
#     prompt = f"Based on the following search results, answer this question:\n\n{query}\n\n---\n\n{combined}"
#     answer = summarize_with_together(prompt)
#     points = split_points(answer)
#     return points  # <--- returns a list!
