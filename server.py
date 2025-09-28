import os, requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load env if present
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

HOST = os.getenv("DATABRICKS_HOST")
ENDPOINT = os.getenv("ENDPOINT")
TOKEN = os.getenv("DATABRICKS_TOKEN")

def chat(messages, temperature=0.2, max_tokens=512):
    url = f"{HOST}/serving-endpoints/{ENDPOINT}/invocations"
    headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
    payload = {"messages": messages, "temperature": temperature, "max_tokens": max_tokens}
    r = requests.post(url, headers=headers, json=payload, timeout=60)
    r.raise_for_status()
    data = r.json()
    # Try common schemas
    return (
        data.get("choices", [{}])[0].get("message", {}).get("content")
        or data.get("output_text")
        or data.get("response")
        or str(data)
    )

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173","http://127.0.0.1:5173"]}})

@app.post("/api/chat")
def api_chat():
    data = request.get_json(force=True) or {}
    message = (data.get("message") or "").strip()
    if not message:
        return jsonify({"response": "Empty message."}), 400
    try:
        reply = chat([{"role": "user", "content": message}])
        return jsonify({"response": reply if isinstance(reply, str) else str(reply)})
    except Exception as e:
        print("chat error:", e)
        return jsonify({"response": "Server error talking to model."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
