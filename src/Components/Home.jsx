import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Layers,
  Rocket,
  Zap,
  Database,
  Globe,
  Workflow,
  Terminal,
  Cpu,
} from "lucide-react";

export default function Home() {
  const courses = [
    {
      id: "java",
      name: "Java 30-Day Tracker",
      desc: "Master Java fundamentals and advanced concepts step by step.",
      icon: <Code2 className="h-10 w-10 text-indigo-500" />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "node",
      name: "Node.js 30-Day Tracker",
      desc: "Learn backend development with Node.js, APIs, and databases.",
      icon: <Layers className="h-10 w-10 text-green-500" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "express",
      name: "Express.js 30-Day Tracker",
      desc: "Build scalable APIs with Express.js and master middleware.",
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "react",
      name: "React 30-Day Tracker",
      desc: "Create modern UIs with React hooks, routing, and state management.",
      icon: <Rocket className="h-10 w-10 text-blue-500" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "spring",
      name: "Spring 30-Day Tracker",
      desc: "Understand Spring core concepts and build enterprise apps.",
      icon: <Workflow className="h-10 w-10 text-green-400" />,
      color: "from-green-400 to-teal-500",
    },
    {
      id: "springboot",
      name: "Spring Boot 30-Day Tracker",
      desc: "Develop production-ready apps faster with Spring Boot.",
      icon: <Zap className="h-10 w-10 text-orange-400" />,
      color: "from-orange-400 to-red-500",
    },
    {
      id: "mongodb",
      name: "MongoDB 30-Day Tracker",
      desc: "Learn NoSQL databases, queries, and scaling with MongoDB.",
      icon: <Database className="h-10 w-10 text-green-300" />,
      color: "from-green-300 to-lime-500",
    },
    {
      id: "mysql",
      name: "MySQL 30-Day Tracker",
      desc: "Master relational database design and SQL queries with MySQL.",
      icon: <Database className="h-10 w-10 text-sky-400" />,
      color: "from-sky-400 to-blue-600",
    },
    {
      id: "frontend",
      name: "Frontend 30-Day Tracker",
      desc: "HTML, CSS, and JavaScript — everything you need to master UI.",
      icon: <Globe className="h-10 w-10 text-pink-400" />,
      color: "from-pink-400 to-purple-600",
    },
    {
      id: "dsa",
      name: "DSA 30-Day Tracker",
      desc: "Learn Data Structures & Algorithms in Java with problem solving.",
      icon: <Cpu className="h-10 w-10 text-yellow-400" />,
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: "mern",
      name: "MERN 30-Day Tracker",
      desc: "Fullstack web development using MongoDB, Express, React, Node.",
      icon: <BookOpen className="h-10 w-10 text-purple-400" />,
      color: "from-purple-400 to-fuchsia-500",
    },
    {
      id: "devops",
      name: "DevOps Basics Tracker",
      desc: "Understand DevOps workflows, CI/CD, Docker, and cloud basics.",
      icon: <Terminal className="h-10 w-10 text-red-400" />,
      color: "from-red-400 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <motion.header
        className="max-w-4xl mx-auto text-center py-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          🚀 Course Tracker Hub
        </h1>
        <p className="text-lg text-gray-300">
          Track your progress in multiple courses and stay motivated every day.
        </p>
      </motion.header>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            className="rounded-2xl shadow-lg bg-gray-800/60 backdrop-blur-lg p-6 hover:scale-105 hover:shadow-xl transition-all border border-gray-700 flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${course.color}`}
              >
                {course.icon}
              </div>
              <h2 className="text-xl font-semibold">{course.name}</h2>
            </div>
            <p className="text-gray-300 flex-1">{course.desc}</p>
            <Link
              to={`/${course.id}`}
              className="mt-6 inline-block px-4 py-2 rounded-xl font-medium bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90 transition-all"
            >
              Start Tracking →
            </Link>
          </motion.div>
        ))}
      </motion.div>

      
    </div>
  );
}
