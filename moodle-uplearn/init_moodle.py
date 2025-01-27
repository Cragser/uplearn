import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class MoodleAPI:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.token = token

    def call(self, function, params):
        url = f"{self.base_url}/webservice/rest/server.php"
        params.update({
            'wstoken': self.token,
            'wsfunction': function,
            'moodlewsrestformat': 'json'
        })
        response = requests.post(url, data=params)
        return response.json()

    def create_course(self, fullname, shortname, category_id=1):
        params = {
            'courses[0][fullname]': fullname,
            'courses[0][shortname]': shortname,
            'courses[0][categoryid]': category_id
        }
        return self.call('core_course_create_courses', params)

    def create_module(self, course_id, name, intro, module_type='assign'):
        params = {
            'courses': [{
                'courseid': course_id,
                'modules': [{
                    'modulename': module_type,
                    'name': name,
                    'intro': intro,
                    'visible': 1
                }]
            }]
        }
        return self.call('core_course_create_module', params)

def main():
    # Initialize Moodle API
    base_url = 'http://localhost:80'
    token = os.getenv('MOODLE_API_TOKEN')
    if not token:
        raise ValueError("MOODLE_API_TOKEN not found in environment variables")
    moodle = MoodleAPI(base_url, token)

    try:
        # Create English Learning Course
        course = moodle.create_course(
            'English Vocabulary Enhancement',
            'eng_vocab',
            1  # Default category
        )
        course_id = course[0]['id']
        print(f"Created course with ID: {course_id}")

        # Create Assignment for Word Practice
        module = moodle.create_module(
            course_id,
            'Daily Word Practice',
            'Practice using your Anki vocabulary words in context.',
            'assign'
        )
        print(f"Created assignment module: {module}")

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == '__main__':
    main()