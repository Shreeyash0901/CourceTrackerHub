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
      id: "node",
      name: "Node.js 30-Day Tracker",
      desc: "Learn backend development with Node.js, APIs, and databases.",
      icon: <Layers className="h-10 w-10 text-green-500" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "java",
      name: "Java 30-Day Tracker",
      desc: "Master Java fundamentals and advanced concepts step by step.",
      icon: <Code2 className="h-10 w-10 text-indigo-500" />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "java-advanced",
      name: "Advanced Java 30-Day Tracker",
      desc: "Deep dive into advanced Java topics like JDBC, JSP, and Servlets.",
      icon: <Cpu className="h-10 w-10 text-yellow-400" />,
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: "javascript",
      name: "JavaScript 30-Day Tracker",
      desc: "Master modern JavaScript fundamentals and ES6+ concepts.",
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "html",
      name: "HTML 30-Day Tracker",
      desc: "Learn semantic HTML and build strong webpage foundations.",
      icon: <Globe className="h-10 w-10 text-pink-400" />,
      color: "from-pink-400 to-purple-600",
    },
    {
      id: "css",
      name: "CSS 30-Day Tracker",
      desc: "Master layouts, Flexbox, Grid, and modern CSS styling.",
      icon: <BookOpen className="h-10 w-10 text-blue-400" />,
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: "react",
      name: "React 30-Day Tracker",
      desc: "Create modern UIs with React hooks, routing, and state management.",
      icon: <Rocket className="h-10 w-10 text-blue-500" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "express",
      name: "Express.js 30-Day Tracker",
      desc: "Build scalable APIs with Express.js and master middleware.",
      icon: <Layers className="h-10 w-10 text-yellow-500" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "mongodb",
      name: "MongoDB 30-Day Tracker",
      desc: "Learn NoSQL databases, queries, and scaling with MongoDB.",
      icon: <Database className="h-10 w-10 text-green-300" />,
      color: "from-green-300 to-lime-500",
    },
    {
      id: "spring",
      name: "Spring 30-Day Tracker",
      desc: "Understand Spring core concepts and build enterprise apps.",
      icon: <Workflow className="h-10 w-10 text-green-400" />,
      color: "from-green-400 to-teal-500",
    },
    {
      id: "hibernate",
      name: "Hibernate 30-Day Tracker",
      desc: "Master ORM with Hibernate for efficient database interaction.",
      icon: <Database className="h-10 w-10 text-sky-400" />,
      color: "from-sky-400 to-blue-600",
    },
  ];

  const quotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Great things never come from comfort zones.",
    "Push yourself, because no one else is going to do it for you.",
    "Dream it. Wish it. Do it.",
    "Small progress is still progress.",
    "Discipline is the bridge between goals and accomplishment.",
    "Hard work beats talent when talent doesn’t work hard.",
    "Focus on being productive instead of busy.",
    "Consistency is what transforms average into excellence.",
    "Opportunities don’t happen, you create them.",
    "Do something today that your future self will thank you for.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t stop until you’re proud.",
    "Your limitation—it’s only your imagination.",
    "Sometimes later becomes never. Do it now.",
    "Great things take time. Stay patient and stay consistent.",
    "Work hard in silence, let success make the noise.",
    "Success doesn’t come to you, you go to it.",
    "Dream bigger. Work harder.",
    "Believe you can and you’re halfway there.",
    "Act as if what you do makes a difference. It does.",
    "Don’t wait for opportunity. Create it.",
    "It always seems impossible until it’s done.",
    "Start where you are. Use what you have. Do what you can.",
    "The secret of getting ahead is getting started.",
    "Fall seven times and stand up eight.",
    "A little progress each day adds up to big results.",
    "Difficult roads often lead to beautiful destinations.",
    "Stay positive, work hard, and make it happen."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

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

      {/* ✅ Motivational Quote Section */}
      <motion.div
        className="max-w-3xl mx-auto mb-12 text-center bg-gray-800/70 p-6 rounded-2xl border border-gray-700 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xl italic text-gray-200">“{randomQuote}”</p>
      </motion.div>

      {/* ✅ Course Grid Section */}
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
  