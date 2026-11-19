
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("NVIDIA_API_KEY")
model = os.getenv("NVIDIA_MODEL")

print("API key loaded:", bool(api_key))
print("Model being used:", model)

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=api_key
)

response = client.chat.completions.create(
    model=model,
    messages=[
        {
            "role": "user",
            "content": "Explain what Python is in simple words."
        }
    ],
    max_tokens=1024
)

print("\nFULL NVIDIA RESPONSE:")
print(response.model_dump_json(indent=2))
