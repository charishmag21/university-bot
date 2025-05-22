# backend/memory/session_memory.py
import json
import os
from threading import Lock

MEMORY_FILE = "backend/memory/chat_memory.json"
lock = Lock()

# Load the memory file at startup, or create an empty dict
def load_memory():
    if not os.path.exists(MEMORY_FILE):
        return {}
    with open(MEMORY_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except Exception:
            return {}

def save_memory(memory):
    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        json.dump(memory, f, ensure_ascii=False, indent=2)

def get_history(session_id):
    with lock:
        memory = load_memory()
        return memory.get(session_id, [])

def add_message(session_id, role, content):
    with lock:
        memory = load_memory()
        if session_id not in memory:
            memory[session_id] = []
        memory[session_id].append({"role": role, "content": content})
        save_memory(memory)
