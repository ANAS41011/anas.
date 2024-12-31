import openai

openai.api_key = '0a58fde912b6e49a87f75d6e77091b8c'

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Hello, how can you assist me?"}
    ]
)

print(response['choices'][0]['message']['content'])