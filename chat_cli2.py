# chat_cli.py yo
import sys
from dbx_agent import chat

print("VT Housing bot — type 'exit' to quit.\n")
while True:
    try:
        user = input("You: ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nbye!")
        break
    if not user:
        continue
    if user.lower() in {"exit", "quit"}:
        print("bye!")
        break

    reply = chat([{"role":"user","content": user}])
    print(f"\nBot: {reply}\n")
