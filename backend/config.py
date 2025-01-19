from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    KEYWORD_FILE_PATH = os.getenv('KEYWORD_FILE_PATH', './model/Hey-Nia_en_mac_v3_0_0.ppn')
    PICOVOICE_ACCESS_KEY = os.getenv('PICOVOICE_ACCESS_KEY', '')
    AUDIO_DEVICE_INDEX = int(os.getenv('AUDIO_DEVICE_INDEX', '-1'))
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    HOME_ASSISTANT_ID = os.getenv('HOME_ASSISTANT_ID', '')
    HOME_ASSISTANT_URL = os.getenv('HOME_ASSISTANT_URL', '')

    def __str__(self):
        return (f"Config(\n"
                f"  KEYWORD_FILE_PATH: {self.KEYWORD_FILE_PATH},\n"
                f"  PICOVOICE_ACCESS_KEY: {self.PICOVOICE_ACCESS_KEY},\n"
                f"  AUDIO_DEVICE_INDEX: {self.AUDIO_DEVICE_INDEX},\n"
                f"  DEBUG: {self.DEBUG},\n"
                f"  HOME_ASSISTANT_ID: {self.HOME_ASSISTANT_ID},\n"
                f"  HOME_ASSISTANT_URL: {self.HOME_ASSISTANT_URL}\n"
                f")")
