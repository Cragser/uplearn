const MOODLE_API_URL = process.env.MOODLE_API_URL || 'http://localhost:80/webservice/rest/server.php';
const IS_DOCKER = process.env.DOCKER_ENVIRONMENT === 'true';
const MOODLE_API_TOKEN = process.env.MOODLE_API_TOKEN || '';
export const getMoodleConnectUrl = () => {
	// If we're running in Docker, use host.docker.internal
	if (IS_DOCKER) {
		return 'http://host.docker.internal:8765';
	}
	return MOODLE_API_URL;
};


export const getMoodleNextConnection = () => {
	return MOODLE_API_URL;
};

export const getMoodleToken = () => {
	return MOODLE_API_TOKEN;
};
