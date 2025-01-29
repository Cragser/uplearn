import { AxiosError } from 'axios';
import { moodleGet } from '../moodle-axios';
import {MoodleApiError} from "@/src/server/error/moodle-api-error";

interface MoodleSection {
	id: number;
	name: string;
	summary: string;
	section: number;
	visible: boolean;
	uservisible: boolean;
	availability: string | null;
	modules: MoodleModule[];
}

interface MoodleModule {
	id: number;
	name: string;
	instance: number;
	modname: string;
	description: string;
	visible: boolean;
	uservisible: boolean;
	availability: string | null;
}

export interface Section {
	id: number;
	name: string;
	description: string;
	sectionNumber: number;
	isVisible: boolean;
	isUserVisible: boolean;
	availability: string | null;
	modules: Module[];
}

export interface Module {
	id: number;
	name: string;
	instanceId: number;
	moduleType: string;
	description: string;
	isVisible: boolean;
	isUserVisible: boolean;
	availability: string | null;
}

function transformModule(moodleModule: MoodleModule): Module {
	return {
		id: moodleModule.id,
		name: moodleModule.name,
		instanceId: moodleModule.instance,
		moduleType: moodleModule.modname,
		description: moodleModule.description,
		isVisible: moodleModule.visible,
		isUserVisible: moodleModule.uservisible,
		availability: moodleModule.availability
	};
}

function transformSection(moodleSection: MoodleSection): Section {
	return {
		id: moodleSection.id,
		name: moodleSection.name,
		description: moodleSection.summary,
		sectionNumber: moodleSection.section,
		isVisible: moodleSection.visible,
		isUserVisible: moodleSection.uservisible,
		availability: moodleSection.availability,
		modules: moodleSection.modules.map(transformModule)
	};
}

export async function getSections(courseId: number): Promise<Section[]> {
	try {
		const response = await moodleGet<MoodleSection[]>('core_course_get_contents', { courseid: courseId });
		const sections = response.data.map(transformSection);
		return sections;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new MoodleApiError(
				`Failed to fetch sections: ${error.response?.data?.message || error.message}`,
				error
			);
		}
		throw new MoodleApiError('An unexpected error occurred while fetching sections', error);
	}
}
