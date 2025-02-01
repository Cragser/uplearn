import { create } from "zustand";

export interface MoodleState {
  courseSelected: string;
  courseIdSelected: number | null;
  setCourseName: (courseName: string) => void;
  setCourseId: (courseId: number) => void;
}

export const useMoodleStore = create<MoodleState>((set) => ({
  courseIdSelected: null,
  courseSelected: "",
  setCourseId: (courseId: number) => set({ courseIdSelected: courseId }),
  setCourseName: (courseName: string) => set({ courseSelected: courseName }),
}));
