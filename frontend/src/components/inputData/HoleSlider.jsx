import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCourseContext } from "../../contexts/CourseContext";


export default function HoleSlider({ teeGender, teeName, assignment, setAssignment }) {
    const { currentCourse } = useCourseContext();

    // get selected tee object from name
    const selectedTee = currentCourse
        ? currentCourse.tees[teeGender]?.find(t => t.tee_name === teeName)
        : null;
    if (!selectedTee) {
        return null;
    }

    // carousel settings
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1224,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
            },
            {
                breakpoint: 840,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    return (
        <div className="mt-20">
            <div className="mx-auto w-5/6">
                <Slider {...settings}>
                    {selectedTee.holes.map((hole, idx) => (
                        <div key={idx} className="px-2">
                            <div className="bg-gray-100 shadow-md mx-2 flex flex-col items-center">
                                {/* Title */}
                                <div className="p-4 mb-5 bg-gradient-to-r from-blue-800 to-blue-300 w-full text-center">
                                    <h2 className="text-3xl font-bold text-white">Hole {idx + 1}</h2>
                                </div>

                                {/* Hole Details */}
                                <ul className="w-full grid gap-4 mb-5">
                                    <li className="flex items-center gap-3">
                                        <span className="text-green-600 font-semibold">⛳ Par:</span>
                                        <span className="text-gray-800">{hole.par}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-blue-600 font-semibold">📏 Yardage:</span>
                                        <span className="text-gray-800">{hole.yardage}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-purple-600 font-semibold">🎯 Stroke Index:</span>
                                        <span className="text-gray-800">{hole.handicap}</span>
                                    </li>
                                </ul>


                                {/* Assignment Input */}
                                <input
                                    type="number"
                                     min={1}
                                    max={selectedTee.holes.length}
                                    step={1}    
                                    placeholder="Enter S.I Assignment"
                                    value={assignment[idx] || ""}
                                    onChange={(e) => {
                                        const newAssign = [...assignment];
                                        newAssign[idx] = e.target.value;
                                        setAssignment(newAssign);
                                    }}
                                    className="bg-white rounded-md p-2 w-3/4 text-center focus:ring-2 focus:ring-blue-500 outline-none mb-3 placeholder:text-sm focus:placeholder-transparent"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Hole Progress Numbers by used stroke indexes */}
                <div className="flex justify-center flex-wrap mt-6 gap-2">
                    {Array.from({ length: selectedTee.holes.length }, (_, idx) => {
                        const number = idx + 1;
                        // check if this number is used anywhere in assignment array
                        const isUsed = assignment.some(val => parseInt(val, 10) === number);
                        return (
                        <div
                            key={number}
                            className={`w-7 h-7 flex items-center justify-center rounded-full ${
                            isUsed ? "bg-green-700 text-white" : "bg-red-500 text-white"
                            }`}
                        >
                            {number}
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}