import requests
import json
import urllib.request
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'moodle-uplearn'))
from init_moodle import MoodleAPI
from logger import setup_logger

# Set up logging
logger = setup_logger()

def test_anki_connection():
    print("\nTesting Anki connection...")
    try:
        requestJson = json.dumps({'action': 'deckNames', 'params': {}, 'version': 6}).encode('utf-8')
        response = json.load(urllib.request.urlopen(urllib.request.Request('http://localhost:8765', requestJson)))
        if response.get('result'):
            print("✓ Anki connection successful")
            print(f"Available decks: {response['result']}")
            return True
        return False
    except Exception as e:
        logger.error(f"Anki connection failed: {str(e)}")
        return False

def test_moodle_connection():
    print("\nTesting Moodle connection...")
    try:
        # Try to access Moodle's front page
        response = requests.get('http://localhost:80')
        if response.status_code == 200:
            print("✓ Moodle server is accessible")
            return True
        logger.error(f"Moodle server returned status code: {response.status_code}")
        return False
    except Exception as e:
        logger.error(f"Moodle connection failed: {str(e)}")
        return False

def test_moodle_api(token):
    print("\nTesting Moodle API...")
    try:
        moodle = MoodleAPI('http://localhost:80', token)
        # Try to create a test course
        course = moodle.create_course(
            'Test Course',
            'test_course',
            1
        )
        if course and isinstance(course, list) and len(course) > 0:
            course_id = course[0]['id']
            print(f"✓ Successfully created test course with ID: {course_id}")
            
            # Try to create a test module
            module = moodle.create_module(
                course_id,
                'Test Assignment',
                'This is a test assignment to verify API functionality'
            )
            if module:
                print("✓ Successfully created test module")
                return True
        return False
    except Exception as e:
        logger.error(f"Moodle API test failed: {str(e)}")
        return False

def main():
    print("Starting system verification...\n")
    print("="*50)
    
    # Test components
    anki_ok = test_anki_connection()
    moodle_ok = test_moodle_connection()
    
    # Only test Moodle API if basic connection works and token is available
    moodle_api_ok = False
    if moodle_ok:
        token = os.getenv('MOODLE_API_TOKEN')
        if token:
            moodle_api_ok = test_moodle_api(token)
        else:
            print("✗ MOODLE_API_TOKEN not found in environment variables")
    
    print("\n" + "="*50)
    print("\nVerification Summary:")
    print(f"Anki Server: {'✓' if anki_ok else '✗'}")
    print(f"Moodle Server: {'✓' if moodle_ok else '✗'}")
    print(f"Moodle API: {'✓' if moodle_api_ok else '✗'}")
    
    if all([anki_ok, moodle_ok, moodle_api_ok]):
        print("\n✓ All systems are functioning correctly!")
    else:
        print("\n✗ Some components need attention. Please check the logs above.")

if __name__ == '__main__':
    main()