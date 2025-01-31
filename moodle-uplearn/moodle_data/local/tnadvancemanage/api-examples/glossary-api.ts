import axios from 'axios';

interface GlossaryTerm {
  concept: string;
  definition: string;
  format?: number; // 1 for HTML, 0 for plain text
}

interface GlossaryCreateParams {
  courseid: number;
  sectionid: number;
  name: string;
  intro: string;
  terms: GlossaryTerm[];
  visible?: boolean;
}

async function createGlossary(params: GlossaryCreateParams, token: string, baseUrl: string) {
  try {
    const response = await axios.post(
      `${baseUrl}/webservice/rest/server.php`,
      null,
      {
        params: {
          wstoken: token,
          wsfunction: 'local_tnadvancemanage_create_glossary',
          moodlewsrestformat: 'json',
          ...params
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating glossary:', error);
    throw error;
  }
}

// Example usage
const glossaryParams: GlossaryCreateParams = {
  courseid: 123,
  sectionid: 1,
  name: 'Course Terminology',
  intro: '<p>Key terms and definitions for this course</p>',
  terms: [
    {
      concept: 'API',
      definition: 'Application Programming Interface - A set of rules that allows one software application to interact with another',
      format: 1
    },
    {
      concept: 'REST',
      definition: 'Representational State Transfer - An architectural style for distributed systems',
      format: 1
    }
  ],
  visible: true
};

// CURL equivalent:
/*
curl -X POST \
  'https://your-moodle-domain/webservice/rest/server.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'wstoken=your-token' \
  -d 'wsfunction=local_tnadvancemanage_create_glossary' \
  -d 'moodlewsrestformat=json' \
  -d 'courseid=123' \
  -d 'sectionid=1' \
  -d 'name=Course Terminology' \
  -d 'intro=<p>Key terms and definitions for this course</p>' \
  -d 'terms[0][concept]=API' \
  -d 'terms[0][definition]=Application Programming Interface - A set of rules that allows one software application to interact with another' \
  -d 'terms[0][format]=1' \
  -d 'terms[1][concept]=REST' \
  -d 'terms[1][definition]=Representational State Transfer - An architectural style for distributed systems' \
  -d 'terms[1][format]=1' \
  -d 'visible=1'
*/