import { useCourseContext } from "../../contexts/CourseContext";

export default function CourseCard({ course }) {
    const { currentCourse, setCurrentCourse } = useCourseContext();
    const isSelected = course.id === currentCourse?.id

    return (
      <div
        onClick={() => setCurrentCourse(course)}
        className={`border p-4 cursor-pointer transition-shadow hover:shadow-lg ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <h3 className="text-lg font-semibold">{course.name}</h3>
        <p className="text-sm text-gray-600">{course.address}</p>

        {isSelected && (
          <div className="mt-3 flex gap-2">
            <a
              href="#"
              target=""
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
            Add data
            </a>
            <a
              href="#"
              target=""
              rel="noopener noreferrer"
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
            View Data
            </a>
          </div>
        )}
      </div>
    );
};