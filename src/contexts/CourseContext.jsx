import React, { createContext, useState, useContext } from "react";
import { courses as mockCourses } from "../data/mockData";

const CourseContext = createContext({
  courses: [],
  fetchCourses: () => {},
  updateCourse: () => {},
});

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(Array.isArray(mockCourses) ? mockCourses : []);

  const fetchCourses = () => setCourses(Array.isArray(mockCourses) ? mockCourses : []);
  const updateCourse = (id, updates) => {
    setCourses((prev) =>
      (prev || []).map((course) =>
        course && course.id === id ? { ...course, ...updates } : course
      )
    );
  };

  return (
    <CourseContext.Provider value={{ courses, fetchCourses, updateCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  return context || { courses: [], fetchCourses: () => {}, updateCourse: () => {} };
};
