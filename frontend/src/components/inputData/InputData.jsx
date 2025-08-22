import ControlPanel from "./ControlPanel";
import { useState } from "react";
import { useCourseContext } from "../../contexts/CourseContext";


export default function InputData() {
    const { currentCourse } = useCourseContext();
    const [teeGender, setTeeGender] = useState("");
    const [teeName, setTeeName] = useState("");
    const [assignment, setAssignment] = useState([]);
    
    return (
        <div className="h-screen w-screen py-8 px-8">
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-blue-600 pt-6 pb-4 mb-6 text-center">
                Add Stroke Index Data
            </h1>

            {/* Control Panel and Tee info */}
            <div>
                <ControlPanel
                    teeGender={teeGender}
                    setTeeGender={setTeeGender}
                    teeName={teeName}
                    setTeeName={setTeeName}
                />
            </div>
        </div>
    );
}
