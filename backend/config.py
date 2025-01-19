from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    KEYWORD_FILE_PATH = os.getenv('KEYWORD_FILE_PATH', './model/Hey-Nia_en_mac_v3_0_0.ppn')
    PICOVOICE_ACCESS_KEY = os.getenv('PICOVOICE_ACCESS_KEY', 'LSBmqys+bPz8mLLWhheF5XsbFNhscIYX31bNNrpopTkLGxVTfWBdfg==')
    AUDIO_DEVICE_INDEX = int(os.getenv('AUDIO_DEVICE_INDEX', '-1'))
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'