import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI (
    base_url="meta/llama-3.1-8b-instruct",
    api_key=os.getenv("NVIDIA_API_KEY"),
)


response = client.chat.completions.create(
    model=os.getenv("NVIDIA_MODEL"),
    messages=[
        {"role": "user", "content": "Explain Python"}
    ],
    max_tokens=200
)

print(response.choices[0].message.content)