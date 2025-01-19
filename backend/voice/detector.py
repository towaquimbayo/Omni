import pvporcupine
from pvrecorder import PvRecorder
import numpy as np
from pydub import AudioSegment
import io


class WakeWordDetector:
    def __init__(self, config):
        self.config = config
        self.porcupine = None
        self._initialize_porcupine()

    def _initialize_porcupine(self):
        try:
            self.porcupine = pvporcupine.create(
                access_key=self.config.PICOVOICE_ACCESS_KEY,
                keyword_paths=[self.config.KEYWORD_FILE_PATH]
            )
            print(f'Porcupine version: {self.porcupine.version}')
        except pvporcupine.PorcupineError as e:
            self._handle_porcupine_error(e)

    def _handle_porcupine_error(self, error):
        error_messages = {
            pvporcupine.PorcupineInvalidArgumentError: "Invalid arguments provided to Porcupine",
            pvporcupine.PorcupineActivationError: "AccessKey activation error",
            pvporcupine.PorcupineActivationLimitError: "AccessKey has reached its temporary device limit",
            pvporcupine.PorcupineActivationRefusedError: "AccessKey refused",
            pvporcupine.PorcupineActivationThrottledError: "AccessKey has been throttled",
            pvporcupine.PorcupineError: "Failed to initialize Porcupine"
        }
        message = error_messages.get(type(error), "Unknown Porcupine error")
        raise type(error)(f"{message}: {str(error)}")

    def process_audio(self, audio_data, save_path=None):
        """
        Process audio data from a REST request

        Args:
            audio_data (bytes): Raw audio data from request
            save_path (str, optional): Path to save processed audio for debugging

        Returns:
            bool: True if wake word detected, False otherwise
        """
        try:
            # Convert audio to format Porcupine expects
            audio = AudioSegment.from_file(io.BytesIO(audio_data))

            # Convert to required format for Porcupine
            audio = audio.set_channels(1)  # Mono
            audio = audio.set_frame_rate(16000)  # 16kHz
            audio = audio.set_sample_width(2)  # 16-bit

            # Save processed audio if requested
            if save_path:
                audio.export(save_path, format="wav")

            # Convert to PCM frames
            pcm_data = np.array(audio.get_array_of_samples())

            # Process frames in chunks of Porcupine's expected frame length
            frame_length = self.porcupine.frame_length
            num_frames = len(pcm_data) // frame_length

            for i in range(num_frames):
                start_idx = i * frame_length
                end_idx = start_idx + frame_length
                frame = pcm_data[start_idx:end_idx]

                if len(frame) == frame_length:  # Ensure frame is complete
                    result = self.porcupine.process(frame)
                    if result >= 0:
                        return True

            return False

        except Exception as e:
            raise RuntimeError(f"Error processing audio: {str(e)}")

    def cleanup(self):
        """Cleanup Porcupine resources"""
        if self.porcupine:
            self.porcupine.delete()