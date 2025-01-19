# app.py
import os

from flask import Flask, request, jsonify, Response
from config import Config
from voice.detector import WakeWordDetector
from voice.voice_to_text import LeopardTranscriber
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins='*')
config = Config()
wake_detector = WakeWordDetector(config)
transcriber = LeopardTranscriber(config)
import requests
import json

@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        return '', 200  # You need to return an empty response body for OPTIONS


def send_to_conversation_api(command: str, language: str = "en"):
    url = f'{config.HOME_ASSISTANT_URL}/api/conversation/process'
    headers = {
        "Authorization": f'{config.HOME_ASSISTANT_ID}',
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




@app.route('/api/<path:path>', methods=['GET', 'POST', 'PUT'])
def proxy(path):
    # Construct the full URL to the target server

    target_url = f'{config.HOME_ASSISTANT_URL}/api/{path}'
    # Get the incoming request's data (if any)
    request_data = request.get_data()

    # Forward headers from incoming request
    headers = dict(request.headers)

    # Forward the method and data to the target server
    if request.method == 'GET':
        resp = requests.get(target_url, headers=headers, data=request_data)
    elif request.method == 'POST':
        resp = requests.post(target_url, headers=headers, data=request_data)
    elif request.method == 'PUT':
        resp = requests.put(target_url, headers=headers, data=request_data)
    # Return the response from the target server to the client
    return resp.content, resp.status_code

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
        speech_response = conversation_response.get("response", {}).get("speech", {}).get("plain", {}).get("speech", "")
        conversation_id = conversation_response.get("conversation_id", "")


        return jsonify({
            "transcribed_text": transcribed_text,
            "command": {
                "speech_response": speech_response,
                "conversation_id":conversation_id
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)