import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wide text-green-400">
            Node.js 30-Day Tracker
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <a href="#home" className="hover:text-green-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#progress" className="hover:text-green-400 transition">
                Progress
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-green-400 transition">
                About
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <span className="text-2xl">✖</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2">
          <ul className="space-y-2">
            <li>
              <a href="#home" className="block hover:text-green-400" onClick={() => setIsOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#progress" className="block hover:text-green-400" onClick={() => setIsOpen(false)}>
                Progress
              </a>
            </li>
            <li>
              <a href="#about" className="block hover:text-green-400" onClick={() => setIsOpen(false)}>
                About
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
