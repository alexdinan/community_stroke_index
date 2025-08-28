import { useCourseContext } from "../../contexts/CourseContext";

export default function CourseCard({ course }) {
    const { currentCourse, setCurrentCourse } = useCourseContext();
    const isSelected = course.id === currentCourse?.id

    return (
      <div
        onClick={() => setCurrentCourse(course)}
        className={`border p-4 cursor-pointer transition-shadow hover:shadow-lg ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <h3 className="text-lg font-semibold">{course.club_name}</h3>
        <p className="text-sm text-gray-600">{course.course_name}</p>
        <p className="text-sm text-gray-600">{course.location.address}, {course.location.country}</p>

        {isSelected && (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                const el = document.getElementById("add_data_title");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }}}
              className="inline-block bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition text-sm">
              Add Data
            </button>
            
            <button
              onClick={() => {
                const el = document.getElementById("view_data_title");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }}}
              className="inline-block bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700 transition text-sm">
              Add Data
            </button>
          </div>
        )}
      </div>
    );
};