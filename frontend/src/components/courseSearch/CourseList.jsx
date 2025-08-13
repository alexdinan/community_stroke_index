import CourseCard from "./CourseCard";

export default function CourseList({ courses = [] }) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {courses.length > 0 ? (
                courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))
            ) : (
                <p className="text-gray-500 text-center">No courses found</p>
            )}
        </div>
    );
};