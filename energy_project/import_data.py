# import_data.py

import json
import requests
import os
from datetime import datetime

API_URL = 'http://127.0.0.1:8000/api/energy-data/'  
JSON_FILE_PATH = 'jsondata.json'  

HEADERS = {
    'Content-Type': 'application/json'
}

def load_json_data(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' does not exist.")
        return []

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            if isinstance(data, dict):
                data = [data]
            return data
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return []
    except UnicodeDecodeError as e:
        print(f"Unicode decode error: {e}")
        return []

def format_datetime(date_str):
    if not date_str:
        return None
    try:
        # Attempt to parse the date string
        dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        return dt.isoformat()
    except ValueError:
        print(f"Warning: Invalid date format '{date_str}'. Skipping date field.")
        return None

def insert_data(entry):
    payload = {
        "end_year": entry.get("end_year") or None,
        "intensity": entry.get("intensity"),
        "sector": entry.get("sector"),
        "topic": entry.get("topic"),
        "insight": entry.get("insight"),
        "url": entry.get("url"),
        "region": entry.get("region"),
        "start_year": entry.get("start_year") or None,
        "impact": entry.get("impact") or None,
        "added": format_datetime(entry.get("added")),
        "published": format_datetime(entry.get("published")),
        "country": entry.get("country"),
        "relevance": entry.get("relevance"),
        "pestle": entry.get("pestle"),
        "source": entry.get("source"),
        "title": entry.get("title"),
        "likelihood": entry.get("likelihood"),
    }
    payload = {k: v for k, v in payload.items() if v is not None}

    try:
        response = requests.post(API_URL, headers=HEADERS, data=json.dumps(payload))
        if response.status_code == 201:
            print(f"Success: '{payload.get('title')}' added.")
        elif response.status_code == 400:
            print(f"Failed to add '{payload.get('title')}': {response.json()}")
        else:
            print(f"Error: Received unexpected status code {response.status_code} for '{payload.get('title')}'.")
    except requests.exceptions.RequestException as e:
        print(f"Request failed for '{payload.get('title')}': {e}")

def main():
    data = load_json_data(JSON_FILE_PATH)
    if not data:
        print("No data to insert.")
        return

    for entry in data:
        insert_data(entry)

if __name__ == "__main__":
    main()
