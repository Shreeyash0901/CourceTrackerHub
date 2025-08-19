import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>
          © {new Date().getFullYear()} Course Tracker Hub — Built with ❤️ by{" "}
          <span className="text-green-400">Shreyeyash</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
