import { AxiosError } from 'axios';
import { moodleGet } from '../moodle-axios';
import {MoodleApiError} from "@/src/server/error/moodle-api-error";

interface MoodleCourse {
	id: number;
	fullname: string;
	shortname: string;
	categoryid: number;
	summary: string;
	format: string;
	startdate: number;
	enddate: number;
	visible: boolean;
}

export interface Course {
	id: number;
	name: string;
	shortName: string;
	categoryId: number;
	description: string;
	startDate: Date;
	endDate: Date;
	isVisible: boolean;
}



function transformCourse(moodleCourse: MoodleCourse): Course {
	return {
		id: moodleCourse.id,
		name: moodleCourse.fullname,
		shortName: moodleCourse.shortname,
		categoryId: moodleCourse.categoryid,
		description: moodleCourse.summary,
		startDate: new Date(moodleCourse.startdate * 1000),
		endDate: new Date(moodleCourse.enddate * 1000),
		isVisible: moodleCourse.visible
	};
}

export async function getCourses(): Promise<Course[]> {
	try {
		const response = await moodleGet<MoodleCourse[]>('core_course_get_courses');

		const courses = response.data
			.filter(course => course.format === 'topics')
			.map(transformCourse);

		return courses;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new MoodleApiError(
				`Failed to fetch courses: ${error.response?.data?.message || error.message}`,
				error
			);
		}
		throw new MoodleApiError('An unexpected error occurred while fetching courses', error);
	}
}
