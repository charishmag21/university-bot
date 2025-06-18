# # import os
# # from dotenv import load_dotenv
# # import openai

# # load_dotenv()
# # openai.api_key = os.getenv("TOGETHER_API_KEY")
# # openai.api_base = "https://api.together.xyz/v1"

# # def summarize_with_together(prompt: str) -> str:
# #     response = openai.ChatCompletion.create(
# #         model="mistralai/Mixtral-8x7B-Instruct-v0.1",
# #         messages=[
# #             {"role": "system", "content": "You are a helpful university assistant."},
# #             {"role": "user", "content": prompt}
# #         ],
# #         temperature=0.7
# #     )
# #     return response.choices[0].message["content"]


# import os
# from dotenv import load_dotenv
# import openai

# load_dotenv()
# openai.api_key = os.getenv("TOGETHER_API_KEY")
# openai.base_url = "https://api.together.xyz/v1"  # openai>=1.0.0 uses base_url, not api_base

# def summarize_with_together(prompt: str) -> str:
#     client = openai.OpenAI(
#         api_key=openai.api_key,
#         base_url=openai.base_url,
#     )
#     response = client.chat.completions.create(
#         model="mistralai/Mixtral-8x7B-Instruct-v0.1",
#         messages=[
#             {"role": "system", "content":
#                 (
#                 "You are UniBot, a friendly and helpful assistant for ALL universities and colleges. "
#                 "Always tailor your answer to the specific university and campus/city mentioned by the user in their question or context. "
#                 "If relevant sources or search results are provided, use them. "
#                 "If not, answer based on your knowledge, but be clear when unsure. "
#                 "Your tone should be accurate, supportive, and clear for students, faculty, or prospective applicants."
#                 )
#             },
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.8
#     )
#     return response.choices[0].message.content

from backend.tools.config import TOGETHER_API_KEY
import openai

TOGETHER_API_BASE_URL = "https://api.together.xyz/v1"

def summarize_with_together(prompt: str) -> str:
    client = openai.OpenAI(
        api_key=TOGETHER_API_KEY,
        base_url=TOGETHER_API_BASE_URL,
    )
    response = client.chat.completions.create(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=[
            {"role": "system", "content":
                (
                "You are UniBot, a friendly and helpful assistant for ALL universities and colleges. "
                "Always tailor your answer to the specific university and campus/city mentioned by the user in their question or context. "
                "If relevant sources or search results are provided, use them. "
                "If not, answer based on your knowledge, but be clear when unsure. "
                "Your tone should be accurate, supportive, and clear for students, faculty, or prospective applicants. "
                "Always format your answers as a clear markdown bullet-point or numbered list. Each fact or idea must be its own bullet or number. "
                "**Do NOT include any URLs, markdown links, or lines starting with 'Source:' in your answer. Just answer clearly in bullet points. All sources will be shown to the user separately below your answer.**"
            )
            },
            {"role": "user", "content": prompt}
        ],
        temperature=0.8
    )
    return response.choices[0].message.content
