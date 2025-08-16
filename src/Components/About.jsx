import { motion } from "framer-motion";
import { BookOpen, Code, Rocket } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl bg-white rounded-2xl shadow-2xl p-10 text-center"
      >
        {/* Heading */}
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          About Course Tracker
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          <span className="font-semibold text-purple-600">Course Tracker</span> 
          is your personalized learning companion. It helps you keep track of your 
          progress across different technologies like Java, JavaScript, React, Node.js, 
          Spring, and more. Whether you’re a student or a professional, this tracker 
          makes your learning journey structured and motivating.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-50 rounded-xl p-6 shadow-md"
          >
            <BookOpen className="w-12 h-12 mx-auto text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold text-indigo-700">Organized Learning</h3>
            <p className="text-gray-600 text-sm mt-2">
              Track your progress in each subject step by step.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50 rounded-xl p-6 shadow-md"
          >
            <Code className="w-12 h-12 mx-auto text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-purple-700">Multiple Courses</h3>
            <p className="text-gray-600 text-sm mt-2">
              Covers Java, JavaScript, HTML, CSS, React, Node.js, and more.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-pink-50 rounded-xl p-6 shadow-md"
          >
            <Rocket className="w-12 h-12 mx-auto text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold text-pink-700">Boost Growth</h3>
            <p className="text-gray-600 text-sm mt-2">
              Stay motivated with a clear roadmap and progress tracker.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
