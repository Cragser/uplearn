import { AxiosError } from "axios";
import { moodleGet } from "../moodle-axios";
import { MoodleApiError } from "@/src/server/error/moodle-api-error";

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
    availability: moodleModule.availability,
    description: moodleModule.description,
    id: moodleModule.id,
    instanceId: moodleModule.instance,
    isUserVisible: moodleModule.uservisible,
    isVisible: moodleModule.visible,
    moduleType: moodleModule.modname,
    name: moodleModule.name,
  };
}

function transformSection(moodleSection: MoodleSection): Section {
  return {
    availability: moodleSection.availability,
    description: moodleSection.summary,
    id: moodleSection.id,
    isUserVisible: moodleSection.uservisible,
    isVisible: moodleSection.visible,
    modules: moodleSection.modules.map(transformModule),
    name: moodleSection.name,
    sectionNumber: moodleSection.section,
  };
}

export async function getSections(courseId: number): Promise<Section[]> {
  try {
    const response = await moodleGet<MoodleSection[]>(
      "core_course_get_contents",
      { courseid: courseId },
    );
    return response.data.map(transformSection);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new MoodleApiError(
        `Failed to fetch sections: 
        ${error.response?.data?.message || error.message}`,
        error,
      );
    }
    throw new MoodleApiError(
      "An unexpected error occurred while fetching sections",
      error,
    );
  }
}
