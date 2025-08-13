import CourseCard from "./CourseCard";

export default function CourseList( { courses }) {

    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
};