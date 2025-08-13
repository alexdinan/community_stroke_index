import SearchBar from "./SearchBar";
import CourseList from "./CourseList";
import Map from "./Map";
import { useState } from "react";

export default function CourseSearch() {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");

    const handleSearch = async (searchQuery) => {
        // reset courses initially
        setCourses([]);

        // check for missing
        if (!searchQuery) {
            setMessage("Search query should not be empty");
            return;
        }

        try {
            // send request to server
            const response = await fetch(`${import.meta.env.VITE_API_URL}/courses?search=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();

            // handle server error
            if (!response.ok) {
                setMessage(data.error || "Search failed");
                return;
            }

            // success
            setCourses(data.courses);
            setMessage(`Success - showing ${data.courses.length} results`)

        } catch (err) {
            // log error
            console.error(`Login failed: ${err}`);
            setMessage("Server failed. Please try again later");
        }
    };


    return (
        <div className="flex h-screen">
            <div className="w-full md:w-1/3 flex flex-col border-r border-gray-200">
                <SearchBar onSearch={handleSearch} />

                {/* Display success / error message */}
                {message && (
                <div
                    className={`px-4 py-2 text-sm border-b border-gray-200 ${
                    message.includes("Success")
                        ? "text-green-700 bg-gray-100"
                        : "text-red-700 bg-gray-100"
                    }`}
                >
                    {message}
                </div>
                )}

                <CourseList courses={courses}/>
            </div>
            <div className="hidden md:flex flex-1 justify-center items-center">
                <Map courses={courses}/>
            </div>
        </div>
    );
};