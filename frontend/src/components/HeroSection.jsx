import React from "react";

const bands = [
    "#2c3340", // dark slate gray-ish (start)
    "#2e3b3f", // transition 1
    "#2f4440", // transition 2
    "#316346", // transition 3
    "#336a47", // brighter medium green (end)
  ];

const HeroSection_ = () => {
  return (
    <div className="w-screen min-h-screen relative flex items-center justify-center px-6 py-16 text-center text-white overflow-hidden">
      {/* Background Bands */}
      <div className="absolute inset-0 flex flex-col">
        {bands.map((color, index) => (
          <div key={index} style={{ backgroundColor: color }} className="flex-1"></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative  z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Perfect Your Swing on Pristine Greens
        </h1>
        <p className="text-lg md:text-xl text-emerald-200 max-w-xl mx-auto">
          Discover world-class golf courses, expert tips, and gear to elevate your game.
        </p>
      </div>
    </div>
  );
};




const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-emerald-300 w-screen min-h-screen flex items-center justify-start px-6 py-16">
      <div className="w-full md:ml-[10%] md:w-1/3 text-left">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Perfect Your Swing on Pristine Greens
        </h1>
        <p className="text-lg md:text-xl text-emerald-200">
          Discover world-class golf courses, expert tips, and gear to elevate your game.
        </p>
      </div>
    </div>
  );
};



export default HeroSection;




