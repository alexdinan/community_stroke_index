import ControlPanel from "./ControlPanel";
import { useState } from "react";
import { useCourseContext } from "../../contexts/CourseContext";
import HoleSlider from "./HoleSlider";


export default function InputData() {
    const { currentCourse } = useCourseContext();
    const [teeGender, setTeeGender] = useState("");
    const [teeName, setTeeName] = useState("");
    const [assignment, setAssignment] = useState([]);
    
    return (
        <div className="h-auto w-screen pt-12 pb-40 px-8">
            {/* Title */}
            <h1 id="add_data_title" className="text-5xl font-extrabold text-blue-600 pt-6 pb-4 mb-6 text-center">
                Add Stroke Index Data
            </h1>

            {/* Control Panel and Tee info */}
            <div>
                <ControlPanel
                    teeGender={teeGender}
                    setTeeGender={setTeeGender}
                    teeName={teeName}
                    setTeeName={setTeeName}
                    setAssignment={setAssignment}
                />
            </div>

            {/* Hole Carousel */}
            <div>
                <HoleSlider teeGender={teeGender} teeName={teeName} assignment={assignment} setAssignment={setAssignment}/>
            </div>
        </div>
    );
}
