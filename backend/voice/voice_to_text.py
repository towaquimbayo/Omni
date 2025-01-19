import pvleopard
from dataclasses import dataclass
from typing import List, Tuple, Union, BinaryIO
import io
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
            # If we got a file-like object, read it
            if hasattr(audio_bytes, 'read'):
                audio_bytes = audio_bytes.read()

            # Process the bytes directly with Leopard
            transcript, words = self.leopard.process_bytes(audio_bytes)

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

