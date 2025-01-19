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
