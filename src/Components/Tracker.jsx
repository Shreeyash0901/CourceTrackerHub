import React, { useState, useEffect, useCallback } from "react";

export default function NodeJsCourseTracker() {
   const daysData = [
    { day: 1, title: "Getting Started with Node.js", tasks: [
      "Install Node.js & npm",
      "Check versions with node -v and npm -v",
      "Run your first script (console.log)",
      "Understand Node.js use cases",
    ]},
    { day: 2, title: "Node.js Basics & Architecture", tasks: [
      "What is the Event Loop?",
      "Blocking vs Non-blocking I/O",
      "Run code in REPL mode",
      "Use process.argv to take inputs",
    ]},
    { day: 3, title: "Working with Files (fs Module)", tasks: [
      "Read files with fs.readFile",
      "Write files with fs.writeFile",
      "Append content with fs.appendFile",
      "Delete files with fs.unlink",
    ]},
    { day: 4, title: "Path, OS, and URL Modules", tasks: [
      "Join paths with path.join",
      "Get OS details with os module",
      "Parse URLs with url module",
    ]},
    { day: 5, title: "Events & EventEmitter", tasks: [
      "What are events in Node.js?",
      "Create a custom EventEmitter",
      "Listen to and emit events",
    ]},
    { day: 6, title: "HTTP Module Basics", tasks: [
      "Create an HTTP server",
      "Send HTML response",
      "Send JSON response",
      "Understand request & response objects",
    ]},
    { day: 7, title: "Streams & Buffers", tasks: [
      "What are streams?",
      "Read large files with createReadStream",
      "Write large files with createWriteStream",
      "Pipe streams together",
    ]},
    { day: 8, title: "Intro to Express.js", tasks: [
      "Install Express",
      "Create a basic Express server",
      "Setup GET & POST routes",
      "Understand request.params & request.query",
    ]},
    { day: 9, title: "Middleware in Express", tasks: [
      "What is middleware?",
      "Create custom logging middleware",
      "Use built-in middleware for JSON parsing",
    ]},
    { day: 10, title: "Error Handling in Express", tasks: [
      "Handle 404 errors",
      "Centralized error handling middleware",
      "Return JSON error responses",
    ]},
    { day: 11, title: "Serving Static Files", tasks: [
      "Serve HTML/CSS/JS from a folder",
      "Setup Express static middleware",
      "Understand relative vs absolute paths",
    ]},
    { day: 12, title: "REST API Basics", tasks: [
      "What is a REST API?",
      "Create CRUD routes with Express",
      "Test APIs in Postman",
    ]},
    { day: 13, title: "Input Validation", tasks: [
      "Why validate user input?",
      "Use Joi/Zod for validation",
      "Validate request body, params, query",
    ]},
    { day: 14, title: "Mini Project: Book Store API", tasks: [
      "Setup Express server",
      "Add CRUD routes for books",
      "Validate inputs",
      "Test with Postman",
    ]},
    { day: 15, title: "MongoDB Setup", tasks: [
      "Install MongoDB locally or use Atlas",
      "Connect to DB with Mongoose",
      "Create first schema & model",
    ]},
    { day: 16, title: "CRUD with MongoDB", tasks: [
      "Insert documents",
      "Find documents",
      "Update documents",
      "Delete documents",
    ]},
    { day: 17, title: "Advanced Mongoose Queries", tasks: [
      "Filter with conditions",
      "Sort results",
      "Select specific fields",
    ]},
    { day: 18, title: "Pagination & Searching", tasks: [
      "Implement skip & limit",
      "Add search functionality",
      "Test with large datasets",
    ]},
    { day: 19, title: "Relationships in MongoDB", tasks: [
      "Reference documents",
      "Populate related data",
      "Example: User & Posts",
    ]},
    { day: 20, title: "Mini Project: Movie API", tasks: [
      "Setup MongoDB connection",
      "CRUD for movies",
      "Add filtering, sorting, pagination",
    ]},
    { day: 21, title: "Deploy MongoDB API", tasks: [
      "Push code to GitHub",
      "Deploy backend on Render",
      "Test live API in Postman",
    ]},
    { day: 22, title: "Password Hashing", tasks: [
      "Install bcrypt",
      "Hash passwords before saving",
      "Compare passwords on login",
    ]},
    { day: 23, title: "JWT Authentication", tasks: [
      "Install jsonwebtoken",
      "Generate token on login",
      "Protect routes with middleware",
    ]},
    { day: 24, title: "Role-Based Access Control", tasks: [
      "Add roles to users",
      "Restrict routes by role",
    ]},
    { day: 25, title: "Security Best Practices", tasks: [
      "Install Helmet",
      "Enable CORS properly",
      "Add rate limiting",
    ]},
    { day: 26, title: "File Uploads", tasks: [
      "Install Multer",
      "Upload single & multiple files",
      "Serve uploaded files",
    ]},
    { day: 27, title: "Testing APIs", tasks: [
      "Install Jest & Supertest",
      "Write first test case",
      "Test GET & POST routes",
    ]},
    { day: 28, title: "Dockerizing Your App", tasks: [
      "Write a Dockerfile",
      "Build & run container",
      "Use docker-compose",
    ]},
    { day: 29, title: "Final Deployment", tasks: [
      "Push to GitHub",
      "Deploy on Render or Vercel",
      "Test production API",
    ]},
    { day: 30, title: "Capstone Project", tasks: [
      "Full CRUD with Auth & MongoDB",
      "Test with Postman",
      "Deploy online",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "nodeCourseProgress_v3";
  const themeKey = "nodeCourseTheme_v1";

  useEffect(() => {
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) setProgress(JSON.parse(savedProgress));

    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme) setDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(themeKey, dark ? "dark" : "light");
  }, [dark]);

  const toggleExpand = (dayIdx) => {
    setExpanded((prev) => ({ ...prev, [dayIdx]: !prev[dayIdx] }));
  };

  const toggleTask = useCallback((dayIdx, taskIdx) => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      const currentDay = newProgress[dayIdx] ? { ...newProgress[dayIdx] } : {};
      currentDay[taskIdx] = !currentDay[taskIdx];
      newProgress[dayIdx] = currentDay;
      return newProgress;
    });
  }, []);

  const markDay = useCallback((dayIdx, value) => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      const tasksCount = daysData[dayIdx].tasks.length;
      const nextDay = {};
      for (let i = 0; i < tasksCount; i++) nextDay[i] = value;
      newProgress[dayIdx] = nextDay;
      return newProgress;
    });
  }, [daysData]);

  const totalTasks = daysData.reduce((sum, d) => sum + d.tasks.length, 0);
  const completedTasks = daysData.reduce((sum, d, dIdx) => {
    const obj = progress[dIdx] || {};
    return sum + Object.values(obj).filter(Boolean).length;
  }, 0);
  const percent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-6`}>
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">📚 Node.js 30-Day Course Tracker</h1>
          <button
            onClick={() => setDark((v) => !v)}
            className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 text-white hover:opacity-90 dark:bg-gray-700"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        <div className="mb-2 text-sm font-medium">
          Progress: {completedTasks} / {totalTasks} tasks ({percent}%)
        </div>
        <div className="w-full h-3 bg-gray-300 rounded-md overflow-hidden mb-6">
          <div className="h-full bg-green-500 transition-all" style={{ width: `${percent}%` }} />
        </div>

        <div className="space-y-4">
          {daysData.map((d, dayIdx) => {
            const dayProgress = progress[dayIdx] || {};
            const doneCount = Object.values(dayProgress).filter(Boolean).length;
            const allDone = doneCount === d.tasks.length && d.tasks.length > 0;

            return (
              <div
                key={d.day}
                className={`${dark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(dayIdx)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left ${
                    allDone ? "bg-green-600 text-white" : dark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${allDone ? "bg-white/20" : "bg-gray-200 dark:bg-gray-700"}`}>
                      {d.day}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold">Day {d.day}: {d.title}</span>
                      <span className="text-xs opacity-80">{doneCount}/{d.tasks.length} tasks</span>
                    </div>
                  </div>
                  <span className="text-xl">{expanded[dayIdx] ? "▲" : "▼"}</span>
                </button>

                {expanded[dayIdx] && (
                  <div className={`${dark ? "bg-gray-900" : "bg-gray-50"} px-4 py-4`}>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => markDay(dayIdx, true)}
                        className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:opacity-90"
                      >
                        Mark all done
                      </button>
                      <button
                        type="button"
                        onClick={() => markDay(dayIdx, false)}
                        className="px-3 py-1.5 text-sm rounded-md bg-gray-300 text-gray-900 hover:opacity-90 dark:bg-gray-700 dark:text-white"
                      >
                        Clear all
                      </button>
                    </div>

                    <ul className="space-y-2">
                      {d.tasks.map((task, taskIdx) => {
                        const id = `d${dayIdx}-t${taskIdx}`;
                        const isChecked = Boolean(progress[dayIdx]?.[taskIdx]);
                        return (
                          <li key={id} className="flex items-start gap-3">
                            <input
                              id={id}
                              type="checkbox"
                              className="mt-1 h-5 w-5 accent-green-600 cursor-pointer"
                              checked={isChecked}
                              onChange={(e) => {
                                e.stopPropagation();
                                toggleTask(dayIdx, taskIdx);
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <label
                              htmlFor={id}
                              className={`${isChecked ? "line-through opacity-70" : ""} cursor-pointer`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {task}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
