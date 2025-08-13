import SearchBar from "./SearchBar";
import CourseList from "./CourseList";
import Map from "./Map";
import { useState } from "react";

export default function CourseSearch() {
    const [courses, setCourses] = useState([]);

    // replace with actual fetch with error handling etc...
    const handleSearch = async () => {
        const courses = [
            {
                id: 1,
                name: "hello",
                address: "hello",
                geocode: [48, 2],
            },
            {   
                id: 2,
                name: "hello",
                address: "hello",
                geocode: [48, 3],
            },
            {
                id: 3,
                name: "hello",
                address: "hello",
                geocode: [-20, 20],
            },
            {
                id: 4,
                name: "hello",
                address: "hello",
                geocode: [0, 0],
            },
            {   
                id: 5,
                name: "hello",
                address: "hello",
                geocode: [23, -12],
            },
            {
                id: 6,
                name: "hello",
                address: "hello",
                geocode: [25, -12],
            },
            {
                id: 7,
                name: "hello",
                address: "hello",
                geocode: [26, -11],
            },
            {   
                id: 8,
                name: "hello",
                address: "hello",
                geocode: [30, 30],
            },
            {
                id: 9,
                name: "hello",
                address: "hello",
                geocode: [15, -15],
            },
        ]
        setCourses(courses);
    }

    return (
        <div className="flex h-screen">
            <div className="w-full md:w-1/3 flex flex-col border-r border-gray-200">
                <SearchBar onSearch={handleSearch} />
                <CourseList courses={courses}/>
            </div>
            <div className="hidden md:flex flex-1 justify-center items-center">
                <Map courses={courses}/>
            </div>
        </div>
    );
};