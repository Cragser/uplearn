"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { courseOptions } from "@/src/client/module/moodle/course-selector/course.options";
import { GenericSelector } from "@/src/client/components/generic-selector/generic-selector";
import { useMoodleStore } from "@/src/client/store/anki/moodle.store";

export function CourseSelector() {
  const [selectedCourse, setSelectedCourse] = React.useState<string>("");
  const { data, error, isError, isLoading } = useQuery(courseOptions);
  const courses = Array.isArray(data) ? data : [];
  const setCourseName = useMoodleStore((state) => state.setCourseName);
  const setCourseId = useMoodleStore((state) => state.setCourseId);

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    const selectedCourse = courses.find((c) => c.id.toString() === value);
    if (selectedCourse) {
      setCourseName(selectedCourse.name);
      setCourseId(selectedCourse.id);
    }
  };

  return (
    <GenericSelector
      items={courses}
      selectedValue={selectedCourse}
      onValueChange={handleCourseChange}
      placeholder="Select a course"
      label="Available Courses"
      isLoading={isLoading}
      error={isError ? error : null}
    />
  );
}
