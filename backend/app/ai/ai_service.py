import httpx
import os

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = "meta-llama/llama-3.1-8b-instruct:free"
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

async def chat_with_ai(messages: list[dict]) -> str:
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "InternTrack AI",
    }
    payload = {
        "model": MODEL,
        "messages": messages,
        "max_tokens": 1000,
    }
    async with httpx.AsyncClient(timeout=30) as client:
        res = await client.post(BASE_URL, json=payload, headers=headers)
        res.raise_for_status()
        return res.json()["choices"][0]["message"]["content"]
