import { Link } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-xl font-bold tracking-wide text-green-400">
            📚 Course Tracker
          </h1>

          <ul className="hidden md:flex space-x-6 items-center">
            <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
            <li><Link to="/progress" className="hover:text-green-400 transition">Progress</Link></li>

            <li className="relative">
              <button
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                className="hover:text-green-400 transition flex items-center"
              >
                Courses ▾
              </button>
              {isCoursesOpen && (
                <ul className="absolute bg-gray-800 mt-2 rounded-md shadow-lg py-2 w-48">
  <li><Link to="/node" className="block px-4 py-2 hover:bg-gray-700">Node.js</Link></li>
  <li><Link to="/java" className="block px-4 py-2 hover:bg-gray-700">Java</Link></li>
  <li><Link to="/java-advanced" className="block px-4 py-2 hover:bg-gray-700">Advanced Java</Link></li>
  <li><Link to="/javascript" className="block px-4 py-2 hover:bg-gray-700">JavaScript</Link></li>
  <li><Link to="/html" className="block px-4 py-2 hover:bg-gray-700">HTML</Link></li>
  <li><Link to="/css" className="block px-4 py-2 hover:bg-gray-700">CSS</Link></li>
  <li><Link to="/react" className="block px-4 py-2 hover:bg-gray-700">React</Link></li>
  <li><Link to="/express" className="block px-4 py-2 hover:bg-gray-700">Express.js</Link></li>
  <li><Link to="/mongodb" className="block px-4 py-2 hover:bg-gray-700">MongoDB</Link></li>
  <li><Link to="/spring" className="block px-4 py-2 hover:bg-gray-700">Spring</Link></li>
  <li><Link to="/hibernate" className="block px-4 py-2 hover:bg-gray-700">Hibernate</Link></li>
</ul>

              )}
            </li>

            <li><Link to="/about" className="hover:text-green-400 transition">About</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
