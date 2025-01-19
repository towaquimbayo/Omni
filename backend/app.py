# app.py
import os

from flask import Flask, request, jsonify
from config import Config
from voice.detector import WakeWordDetector
from voice.voice_to_text import LeopardTranscriber

app = Flask(__name__)
config = Config()
wake_detector = WakeWordDetector(config)
transcriber = LeopardTranscriber(config)
import requests
import json


def send_to_conversation_api(command: str, language: str = "en"):
    url = "http://64.180.57.134:8123/api/conversation/process"
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5ZDBlMzdhZDUyMWU0OTZiYTAyZjY4NGJlYjU3OTdiMyIsImlhdCI6MTczNzI2OTE5OCwiZXhwIjoyMDUyNjI5MTk4fQ.HyPw8PJuib0icOVRcgYUKxsAEvkE5yhYvHfxMZdGCfc",  # Replace with your Home Assistant long-lived token
        "Content-Type": "application/json"
    }

    payload = {
        "text": command,
        "language": language,
        "agent_id": "conversation.chatgpt"
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))

        # Check for success response
        if response.status_code == 200:
            return response.json()  # Returns the conversation response
        else:
            return {"error": "Failed to process the command", "status_code": response.status_code}
    except Exception as e:
        return {"error": str(e)}

@app.route('/voice/wakeup', methods=['POST'])
def wake_word_detection():
    """
    Route to check if audio contains wake word
    """
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    audio_data = audio_file.read()

    # Process audio file
    try:
        wake_up_command = wake_detector.process_audio(audio_data)

        return jsonify({
            "wake_word_detected": wake_up_command,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/voice/transcribe', methods=['POST'])
def transcribe_command():
    """
    Route to transcribe voice command and process for smart home control
    """
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    audio_data = audio_file.read()

    try:
        # Process and transcribe audio
        transcribed_text= transcriber.transcribe_bytes(audio_data)
        # # Process command
        conversation_response = send_to_conversation_api(transcribed_text[0])
        #
        # # Extract useful information from the conversation response
        print(conversation_response)
        action = conversation_response.get("action", None)
        device = conversation_response.get("device", None)
        params = conversation_response.get("parameters", None)

        return jsonify({
            "transcribed_text": transcribed_text,
            "command": {
                "action": action,
                "device": device,
                "parameters": params
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)