import axios from 'axios';

interface QuizQuestion {
  type: string;
  name: string;
  questiontext: string;
  defaultmark: number;
  answers?: Array<{
    text: string;
    fraction: number;
  }>;
}

interface QuizCreateParams {
  courseid: number;
  sectionid: number;
  name: string;
  intro: string;
  questions: QuizQuestion[];
}

async function createQuiz(params: QuizCreateParams, token: string, baseUrl: string) {
  try {
    const response = await axios.post(
      `${baseUrl}/webservice/rest/server.php`,
      null,
      {
        params: {
          wstoken: token,
          wsfunction: 'local_tnadvancemanage_create_quiz',
          moodlewsrestformat: 'json',
          ...params
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
}

// Example usage
const quizParams: QuizCreateParams = {
  courseid: 123,
  sectionid: 1,
  name: 'Sample Quiz',
  intro: '<p>This is a sample quiz created via API</p>',
  questions: [
    {
      type: 'multichoice',
      name: 'Sample Question 1',
      questiontext: 'What is the capital of France?',
      defaultmark: 1,
      answers: [
        { text: 'Paris', fraction: 1 },
        { text: 'London', fraction: 0 },
        { text: 'Berlin', fraction: 0 },
        { text: 'Madrid', fraction: 0 }
      ]
    }
  ]
};

// CURL equivalent:
/*
curl -X POST \
  'https://your-moodle-domain/webservice/rest/server.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'wstoken=your-token' \
  -d 'wsfunction=local_tnadvancemanage_create_quiz' \
  -d 'moodlewsrestformat=json' \
  -d 'courseid=123' \
  -d 'sectionid=1' \
  -d 'name=Sample Quiz' \
  -d 'intro=<p>This is a sample quiz created via API</p>' \
  -d 'questions[0][type]=multichoice' \
  -d 'questions[0][name]=Sample Question 1' \
  -d 'questions[0][questiontext]=What is the capital of France?' \
  -d 'questions[0][defaultmark]=1' \
  -d 'questions[0][answers][0][text]=Paris' \
  -d 'questions[0][answers][0][fraction]=1' \
  -d 'questions[0][answers][1][text]=London' \
  -d 'questions[0][answers][1][fraction]=0' \
  -d 'questions[0][answers][2][text]=Berlin' \
  -d 'questions[0][answers][2][fraction]=0' \
  -d 'questions[0][answers][3][text]=Madrid' \
  -d 'questions[0][answers][3][fraction]=0'
*/