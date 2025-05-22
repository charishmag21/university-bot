import os
from dotenv import load_dotenv

# ✅ Force-load .env
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))
print("🔍 Loading .env from:", env_path)
load_dotenv(dotenv_path=env_path, override=True)

# 🔍 Manual debug fallback
if os.getenv("SERPER_API_KEY") is None:
    print("❌ Still not loading from .env. Trying manual assignment.")
    os.environ["SERPER_API_KEY"] = "3206e4d5b8d61f3d225b55db3b6d830d0673f192"
    os.environ["TOGETHER_API_KEY"] = "b7f9e367bef56552e327ef2235e2a6e05d4a2ee62c18397a0c156253f7bff767"

SERPER_API_KEY = os.getenv("SERPER_API_KEY")
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

print("✅ Loaded SERPER_API_KEY:", SERPER_API_KEY[:6], "...")
print("✅ Loaded TOGETHER_API_KEY:", TOGETHER_API_KEY[:6], "...")

if SERPER_API_KEY is None:
    raise ValueError("❌ SERPER_API_KEY is missing in your .env file.")
if TOGETHER_API_KEY is None:
    raise ValueError("❌ TOGETHER_API_KEY is missing in your .env file.")
