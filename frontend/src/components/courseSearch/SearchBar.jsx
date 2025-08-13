import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
      <div className="p-4 flex gap-2 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search golf courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          onClick={() => onSearch(searchQuery)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    );
};