import { useCourseContext } from "../../contexts/CourseContext";


export default function ControlPanel({ teeGender, setTeeGender, teeName, setTeeName, setAssignment }) {
    const { currentCourse } = useCourseContext();

    // get options for dropdown menus
    const genderOptions = currentCourse ? Object.keys(currentCourse.tees) : [];
    const teeNameOptions = currentCourse?.tees?.[teeGender] || [];

    // get selected tee object from name
    const selectedTee = currentCourse
        ? currentCourse.tees[teeGender]?.find(t => t.tee_name === teeName)
        : null;

    return (
        <div className="mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">

                {/* Current Course */}
                <div className="inline-block p-4">
                    <h4 className="font-bold pb-1">Current Course:</h4>
                    <span className={currentCourse ? "text-blue-800 italic" : "text-red-500 italic"}>
                        {currentCourse
                            ? currentCourse.club_name === currentCourse.course_name
                                ? `${currentCourse.club_name}`
                                : `${currentCourse.club_name} - ${currentCourse.course_name}`
                            : "No course selected..."
                        }
                    </span>
                    <p>{currentCourse ? `${currentCourse.location.country} - ${currentCourse.location.city}` : ""}</p>

                    <button
                        onClick={() => {
                        const el = document.getElementById("course_search_title");
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                        }}}
                        className="inline-block bg-blue-600 text-white px-2 py-1 rounded shadow hover:bg-blue-700 transition">
                        Change Course
                    </button>
                </div>

                {/* Tee Gender Dropdown */}
                <div className="inline-block p-4">
                    <h4 className="font-bold pb-1">Tee Gender:</h4>
                    <select
                        value={teeGender || ""}
                        onChange={(e) => {
                            setTeeGender(e.target.value);
                            setTeeName("");
                            setAssignment([]);
                        }}
                        className="border rounded-lg p-2"
                    >
                        <option value="">Select...</option>
                        {genderOptions.map((g) => (
                            <option key={g} value={g}>
                                {g.charAt(0).toUpperCase() + g.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tee Name Dropdown */}
                <div className="inline-block p-4">
                    <h4 className="font-bold pb-1">Tee Name:</h4>
                    <select
                        value={teeName || ""}
                        onChange={(e) => {
                            setTeeName(e.target.value);
                            setAssignment([]);
                        }}
                        className="border rounded-lg p-2"
                        disabled={!teeGender}
                    >
                        <option value="">Select...</option>
                        {teeNameOptions.map((t) => (
                            <option key={t.tee_name} value={t.tee_name}>
                            {t.tee_name}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Tee Info */}
                <div className="inline-block p-4">
                    <h4 className="font-bold pb-1">Tee Info:</h4>
                    {selectedTee
                        ? <ul className="grid grid-cols-2 gap-x-6 gap-y-1 list-none p-0 m-0">
                                <li><span className="font-medium">Course Rating:</span> {selectedTee.course_rating}</li>
                                <li><span className="font-medium">Slope Rating:</span> {selectedTee.slope_rating}</li>
                                <li><span className="font-medium">Total Yards:</span> {selectedTee.total_yards}</li>
                                <li><span className="font-medium">Total Par:</span> {selectedTee.par_total}</li>
                                <li><span className="font-medium">Number of Holes:</span> {selectedTee.number_of_holes}</li>
                            </ul>
                        : <span className="text-red-500 italic">No tee selected...</span>
                    }
                </div>
            </div>
        </div>
    );
}
