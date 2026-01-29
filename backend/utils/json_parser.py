import json

def safe_json_parse(text):
    try:
        return json.loads(text)
    except:
        text = text.replace("```json", "").replace("```", "")
        start = text.find("{")
        end = text.rfind("}") + 1
        clean = text[start:end]
        return json.loads(clean)
