import pvleopard
from dataclasses import dataclass
from typing import List, Tuple, Union, BinaryIO
import io
import numpy as np
from pydub import AudioSegment
import wave


@dataclass
class TranscriptWord:
    word: str
    start_sec: float
    end_sec: float
    confidence: float


class LeopardTranscriber:
    def __init__(self, config):
        """
        Initialize the Leopard transcriber

        Args:
            access_key: Picovoice access key for Leopard
        """
        self.leopard = pvleopard.create(access_key=config.PICOVOICE_ACCESS_KEY,)

    def transcribe_bytes(self, audio_bytes: Union[bytes, BinaryIO],
                         sample_rate: int = 16000) -> Tuple[str, List[TranscriptWord]]:
        """
        Transcribe audio from bytes or binary stream

        Args:
            audio_bytes: Audio data as bytes or binary stream
            sample_rate: Sample rate of the audio (default: 16000)

        Returns:
            Tuple containing:
                - Full transcript as string
                - List of TranscriptWord objects with timing and confidence
        """
        try:
            # Convert audio to format Porcupine expects
            audio = AudioSegment.from_file(io.BytesIO(audio_bytes))

            # Convert to required format for Porcupine
            audio = audio.set_channels(1)  # Mono
            audio = audio.set_frame_rate(16000)  # 16kHz
            audio = audio.set_sample_width(2)  # 16-bit
            pcm_data = np.array(audio.get_array_of_samples())
            # # Convert to PCM frames
            # pcm_data = np.array(audio.get_array_of_samples())
            #
            # # Process frames in chunks of Porcupine's expected frame length
            # frame_length = self.leopard.frame_length
            # num_frames = len(pcm_data) // frame_length
            #
            # for i in range(num_frames):
            #     start_idx = i * frame_length
            #     end_idx = start_idx + frame_length
            #     frame = pcm_data[start_idx:end_idx]
            #
            #     if len(frame) == frame_length:  # Ensure frame is complete
            #         result = self.leopard.process(frame)
            # # If we got a file-like object, read it
            # if hasattr(audio_bytes, 'read'):
            #     audio_bytes = audio_bytes.read()

            # Process the bytes directly with Leopard
            transcript, words = self.leopard.process(pcm_data)
            # Convert words to TranscriptWord objects
            word_objects = [
                TranscriptWord(
                    word=word.word,
                    start_sec=word.start_sec,
                    end_sec=word.end_sec,
                    confidence=word.confidence
                )
                for word in words
            ]

            return transcript, word_objects

        except Exception as e:
            print(f"Error transcribing audio bytes: {str(e)}")
            raise

    def transcribe_file(self, audio_path: str) -> Tuple[str, List[TranscriptWord]]:
        """
        Transcribe an audio file and return the transcript and word details

        Args:
            audio_path: Path to the audio file

        Returns:
            Tuple containing:
                - Full transcript as string
                - List of TranscriptWord objects with timing and confidence
        """
        try:
            transcript, words = self.leopard.process_file(audio_path)

            word_objects = [
                TranscriptWord(
                    word=word.word,
                    start_sec=word.start_sec,
                    end_sec=word.end_sec,
                    confidence=word.confidence
                )
                for word in words
            ]

            return transcript, word_objects

        except Exception as e:
            print(f"Error transcribing file: {str(e)}")
            raise

    def print_word_details(self, words: List[TranscriptWord]):
        """
        Print detailed information about each transcribed word

        Args:
            words: List of TranscriptWord objects
        """
        for word in words:
            print(
                "{word=\"%s\" start_sec=%.2f end_sec=%.2f confidence=%.2f}"
                % (word.word, word.start_sec, word.end_sec, word.confidence)
            )

    def get_words_in_timerange(self, words: List[TranscriptWord],
                               start_time: float, end_time: float) -> List[TranscriptWord]:
        """
        Get all words that fall within a specific time range

        Args:
            words: List of TranscriptWord objects
            start_time: Start time in seconds
            end_time: End time in seconds

        Returns:
            List of TranscriptWord objects within the time range
        """
        return [
            word for word in words
            if start_time <= word.start_sec and word.end_sec <= end_time
        ]

    def get_high_confidence_words(self, words: List[TranscriptWord],
                                  confidence_threshold: float = 0.9) -> List[TranscriptWord]:
        """
        Get words above a certain confidence threshold

        Args:
            words: List of TranscriptWord objects
            confidence_threshold: Minimum confidence score (0-1)

        Returns:
            List of high-confidence TranscriptWord objects
        """
        return [
            word for word in words
            if word.confidence >= confidence_threshold
        ]

    def __del__(self):
        """Cleanup Leopard instance"""
        if hasattr(self, 'leopard'):
            self.leopard.delete()

