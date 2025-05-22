import os
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.getenv("TOGETHER_API_KEY")
openai.api_base = "https://api.together.xyz/v1"

def summarize_with_together(prompt: str) -> str:
    response = openai.ChatCompletion.create(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=[
            {"role": "system", "content": "You are a helpful university assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )
    return response.choices[0].message["content"]

# def summarize_with_together(prompt: str) -> str:
#     instruction = (
#         "INSTRUCTION: Always answer in clear, concise numbered points (1., 2., 3., ...). "
#         "If sources or references exist, put them at the end.\n\n"
#     )
#     full_prompt = instruction + prompt
#     response = openai.ChatCompletion.create(
#         model="mistralai/Mixtral-8x7B-Instruct-v0.1",
#         messages=[
#             {"role": "system", "content": "You are a helpful university assistant."},
#             {"role": "user", "content": full_prompt}
#         ],
#         temperature=0.7
#     )
#     return response.choices[0].message["content"]
