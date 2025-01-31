import axios from 'axios';

interface PageCreateParams {
  courseid: number;
  sectionid: number;
  name: string;
  content: string;
  visible?: boolean;
}

async function createPage(params: PageCreateParams, token: string, baseUrl: string) {
  try {
    const response = await axios.post(
      `${baseUrl}/webservice/rest/server.php`,
      null,
      {
        params: {
          wstoken: token,
          wsfunction: 'local_tnadvancemanage_create_page',
          moodlewsrestformat: 'json',
          ...params
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}

// Example usage
const pageParams: PageCreateParams = {
  courseid: 123,
  sectionid: 1,
  name: 'Welcome Page',
  content: '<h1>Welcome to the Course</h1><p>This is a sample page created via API.</p>',
  visible: true
};

// CURL equivalent:
/*
curl -X POST \
  'https://your-moodle-domain/webservice/rest/server.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'wstoken=your-token' \
  -d 'wsfunction=local_tnadvancemanage_create_page' \
  -d 'moodlewsrestformat=json' \
  -d 'courseid=123' \
  -d 'sectionid=1' \
  -d 'name=Welcome Page' \
  -d 'content=<h1>Welcome to the Course</h1><p>This is a sample page created via API.</p>' \
  -d 'visible=1'
*/