import axios from 'axios';

interface DatabaseField {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

interface DatabaseCreateParams {
  courseid: number;
  sectionid: number;
  name: string;
  intro: string;
  fields: DatabaseField[];
  visible?: boolean;
}

async function createDatabase(params: DatabaseCreateParams, token: string, baseUrl: string) {
  try {
    const response = await axios.post(
      `${baseUrl}/webservice/rest/server.php`,
      null,
      {
        params: {
          wstoken: token,
          wsfunction: 'local_tnadvancemanage_create_database',
          moodlewsrestformat: 'json',
          ...params
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  }
}

// Example usage
const databaseParams: DatabaseCreateParams = {
  courseid: 123,
  sectionid: 1,
  name: 'Student Projects',
  intro: '<p>Database for tracking student projects</p>',
  fields: [
    {
      name: 'project_title',
      type: 'text',
      description: 'Title of the project',
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      description: 'Detailed project description',
      required: true
    },
    {
      name: 'submission_date',
      type: 'date',
      description: 'Project submission date',
      required: true
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
  -d 'wsfunction=local_tnadvancemanage_create_database' \
  -d 'moodlewsrestformat=json' \
  -d 'courseid=123' \
  -d 'sectionid=1' \
  -d 'name=Student Projects' \
  -d 'intro=<p>Database for tracking student projects</p>' \
  -d 'fields[0][name]=project_title' \
  -d 'fields[0][type]=text' \
  -d 'fields[0][description]=Title of the project' \
  -d 'fields[0][required]=1' \
  -d 'fields[1][name]=description' \
  -d 'fields[1][type]=textarea' \
  -d 'fields[1][description]=Detailed project description' \
  -d 'fields[1][required]=1' \
  -d 'fields[2][name]=submission_date' \
  -d 'fields[2][type]=date' \
  -d 'fields[2][description]=Project submission date' \
  -d 'fields[2][required]=1' \
  -d 'visible=1'
*/