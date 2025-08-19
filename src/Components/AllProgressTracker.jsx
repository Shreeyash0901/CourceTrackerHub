// src/Components/AllProgressTracker.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AllProgressTracker() {
  // For now, we’ll just check localStorage of each course
  const courses = [
    { id: "java", name: "Java", storageKey: "javaCourseProgress_v1" },
    { id: "node", name: "Node.js", storageKey: "nodeCourseProgress_v1" },
    { id: "react", name: "React", storageKey: "reactCourseProgress_v1" },
    { id: "express", name: "Express.js", storageKey: "expressCourseProgress_v1" },
    { id: "mongodb", name: "MongoDB", storageKey: "mongodbCourseProgress_v1" },
    { id: "spring", name: "Spring", storageKey: "springCourseProgress_v1" },
    { id: "hibernate", name: "Hibernate", storageKey: "hibernateCourseProgress_v1" },
    // add more when needed
  ];

  const getProgress = (storageKey) => {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey)) || {};
      let completed = 0;
      let total = 0;
      Object.values(data).forEach((day) => {
        total += Object.keys(day).length;
        completed += Object.values(day).filter(Boolean).length;
      });
      if (total === 0) return { percent: 0, completed, total };
      return { percent: Math.round((completed / total) * 100), completed, total };
    } catch {
      return { percent: 0, completed: 0, total: 0 };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.h1
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📊 All Courses Progress Tracker
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {courses.map((course) => {
          const { percent, completed, total } = getProgress(course.storageKey);
          return (
            <motion.div
              key={course.id}
              className="bg-gray-800 rounded-xl p-4 shadow-md hover:scale-[1.02] transition"
              whileHover={{ y: -3 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{course.name}</h2>
                <span className="text-sm text-gray-400">
                  {completed}/{total} tasks
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-gray-700 rounded-md overflow-hidden mb-3">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">{percent}% completed</span>
                <Link
                  to={`/${course.id}`}
                  className="px-3 py-1.5 rounded-md bg-pink-500 hover:bg-pink-600 text-sm"
                >
                  Open →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
