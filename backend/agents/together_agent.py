# import os
# from dotenv import load_dotenv
# import openai

# load_dotenv()
# openai.api_key = os.getenv("TOGETHER_API_KEY")
# openai.api_base = "https://api.together.xyz/v1"

# def summarize_with_together(prompt: str) -> str:
#     response = openai.ChatCompletion.create(
#         model="mistralai/Mixtral-8x7B-Instruct-v0.1",
#         messages=[
#             {"role": "system", "content": "You are a helpful university assistant."},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.7
#     )
#     return response.choices[0].message["content"]


import os
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.getenv("TOGETHER_API_KEY")
openai.base_url = "https://api.together.xyz/v1"  # openai>=1.0.0 uses base_url, not api_base

def summarize_with_together(prompt: str) -> str:
    client = openai.OpenAI(
        api_key=openai.api_key,
        base_url=openai.base_url,
    )
    response = client.chat.completions.create(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=[
            {"role": "system", "content":
                (
                "You are UniBot, a friendly university assistant. "
                "Answer university and general questions in a conversational, helpful, and human way—like a supportive student or academic counselor. "
                "If the user asks about life, career, or personal topics, answer thoughtfully and guide them supportively. "
                "For university-specific questions, use your knowledge and any provided sources. "
                "If you don’t know, be honest, but try to help anyway!"
                )
            },
            {"role": "user", "content": prompt}
        ],
        temperature=0.8
    )
    return response.choices[0].message.content
