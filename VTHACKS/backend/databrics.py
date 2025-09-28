import os, sys, json, requests
try:
    from dotenv import load_dotenv
    loaded = load_dotenv()
except Exception:
    loaded = False

print("=== DIAG ===")
print("CWD:", os.getcwd())
print(".env loaded by python-dotenv:", loaded)
print("DATABRICKS_HOST:", os.getenv("DATABRICKS_HOST"))
print("ENDPOINT:", os.getenv("ENDPOINT"))
print("Has TOKEN:", bool(os.getenv("DATABRICKS_TOKEN")))
print("============")

HOST  = os.getenv("DATABRICKS_HOST")
TOKEN = os.getenv("DATABRICKS_TOKEN")
EP    = os.getenv("ENDPOINT") or "databricks-gpt-oss-120b"

if not HOST or not TOKEN:
    print("ERROR: Missing DATABRICKS_HOST or DATABRICKS_TOKEN. Check your .env in this folder.")
    sys.exit(1)

URL = f"{HOST.rstrip('/')}/serving-endpoints/{EP}/invocations"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

SYSTEM_PROMPT = "You are helpful."

body = {
    "messages": [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": "Say 'hello from VS Code' in one short sentence."}
    ],
    "max_tokens": 64
}

print("POST", URL)
try:
    r = requests.post(URL, headers=HEADERS, json=body, timeout=60)
    print("HTTP Status:", r.status_code)
    print("Content-Type:", r.headers.get("content-type"))
    txt = r.text
    print("Raw body (first 400 chars):")
    print(txt[:400])
    if r.headers.get("content-type","").startswith("application/json"):
        data = r.json()
        out = data.get("output") or data.get("choices",[{}])[0].get("message",{}).get("content")
        print("--- Parsed output ---")
        print(out)
except Exception as e:
    print("REQUEST ERROR:", repr(e))
    sys.exit(1)
#aye