const ANKI_API_URL = process.env.ANKI_API_URL || 'http://localhost:8765';
const IS_DOCKER = process.env.DOCKER_ENVIRONMENT === 'true';
export const getAnkiConnectUrl = () => {
	// If we're running in Docker, use host.docker.internal
	if (IS_DOCKER) {
		return 'http://host.docker.internal:8765';
	}
	return ANKI_API_URL;
};

type AnkiAction = 'get-decks';

export const getAnkiNextConnection = (action: AnkiAction) => {
	// http://localhost:3000/api/anki/get-decks
	return `http://localhost:3000/api/anki/${action}`;
};
