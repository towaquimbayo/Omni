
# Voice Command API Documentation

This is a simple API that processes voice commands, detects wake words, and handles transcription for smart home control. It uses a conversation API to process the transcribed text and return a response.

## Endpoints

### 1. **POST /voice/wakeup**
Detects whether the audio contains a wake word.

#### Request
- **Method**: `POST`
- **URL**: `/voice/wakeup`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `audio` (required): The audio file to be processed. The audio should be in an appropriate format for wake word detection (e.g., WAV, MP3).

#### Example Request:
```bash
curl -X POST http://localhost:5000/voice/wakeup \
  -F "audio=@path_to_audio_file.wav"
```

#### Response
- **Success (200 OK)**:
    ```json
    {
      "wake_word_detected": true
    }
    ```

- **Error (400 Bad Request)**:
    ```json
    {
      "error": "No audio file provided"
    }
    ```

- **Error (500 Internal Server Error)**:
    ```json
    {
      "error": "Error message details"
    }
    ```

---

### 2. **POST /voice/transcribe**
Transcribes the audio file into text and processes it for smart home control.

#### Request
- **Method**: `POST`
- **URL**: `/voice/transcribe`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `audio` (required): The audio file to be transcribed. The audio should be in a compatible format for transcription (e.g., WAV, MP3).

#### Example Request:
```bash
curl -X POST http://localhost:5000/voice/transcribe \
  -F "audio=@path_to_audio_file.wav"
```

#### Response
- **Success (200 OK)**:
    ```json
    {
      "transcribed_text": "Turn on the living room lights.",
      "command": {
        "speech_response": "The lights in the living room have been turned on.",
        "conversation_id": "jkhsdjhgahjgfhjaf"
      }
    }
    ```

- **Error (400 Bad Request)**:
    ```json
    {
      "error": "No audio file provided"
    }
    ```

- **Error (500 Internal Server Error)**:
    ```json
    {
      "error": "Error message details"
    }
    ```

---

## Functionality Overview

### `send_to_conversation_api(command: str, language: str = "en")`
Sends the transcribed command to the conversation API and processes the response.

- **Parameters**:
  - `command` (str): The text command to be processed.
  - `language` (str): The language of the command (default is "en").

- **Returns**:
  - A JSON response from the conversation API or an error message if the request fails.

---

## Running the Application

1. Clone the repository or set up the project.
2. Install the necessary dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up the environment variables:
   - `HOME_ASSISTANT_URL`: The URL of the Home Assistant instance.
   - `HOME_ASSISTANT_ID`: The authorization token for Home Assistant.

4. Run the Flask application:
   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`.

---

## Error Handling

- **400 Bad Request**: The request is missing required fields, such as the `audio` file.
- **500 Internal Server Error**: An error occurred while processing the request. The response will include the error details.

---

## Example Error Response

```json
{
  "error": "No audio file provided"
}
```
