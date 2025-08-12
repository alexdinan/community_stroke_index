import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export function CourseProvider({ children }) {
    const [currentCourse, setCurrentCourse] = useState(null);

    return (
        <CourseContext.Provider value={{ currentCourse, setCurrentCourse }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourseContext = () => useContext(CourseContext);
