import React, { useState, useEffect, useCallback } from "react";

export default function ExpressCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to Express", tasks: [
      "What is Express?",
      "Install Express with npm",
      "Hello World app",
    ]},
    { day: 2, title: "Basic Routing", tasks: [
      "GET, POST basics",
      "Route paths",
      "Route parameters",
    ]},
    { day: 3, title: "Middleware Basics", tasks: [
      "What is middleware?",
      "Application-level middleware",
      "Built-in middleware (express.json, express.urlencoded)",
    ]},
    { day: 4, title: "Serving Static Files", tasks: [
      "express.static()",
      "Serving images, CSS, JS",
      "Static folder setup",
    ]},
    { day: 5, title: "Request & Response", tasks: [
      "req.params, req.query",
      "req.body basics",
      "res.send, res.json",
    ]},
    { day: 6, title: "Templating Engines", tasks: [
      "EJS setup",
      "Rendering templates",
      "Passing data to views",
    ]},
    { day: 7, title: "Error Handling Basics", tasks: [
      "Default error handling",
      "Custom error middleware",
      "404 routes",
    ]},
    { day: 8, title: "Modular Routing", tasks: [
      "Router object",
      "Splitting routes into files",
      "Using route modules",
    ]},
    { day: 9, title: "Environment Variables", tasks: [
      "dotenv setup",
      "process.env usage",
      "Config management",
    ]},
    { day: 10, title: "Express Generator", tasks: [
      "Install express-generator",
      "Project structure",
      "Customizing generator app",
    ]},
    { day: 11, title: "Form Handling", tasks: [
      "Handling POST forms",
      "Parsing URL-encoded data",
      "Validation basics",
    ]},
    { day: 12, title: "Advanced Middleware", tasks: [
      "Third-party middleware (morgan, cors)",
      "Custom middleware functions",
      "Middleware chaining",
    ]},
    { day: 13, title: "REST API Basics", tasks: [
      "What is REST?",
      "CRUD operations",
      "JSON responses",
    ]},
    { day: 14, title: "Postman Testing", tasks: [
      "Install & setup Postman",
      "Send GET/POST requests",
      "Check headers & response",
    ]},
    { day: 15, title: "Express with MongoDB", tasks: [
      "Install mongoose",
      "Connect to MongoDB",
      "Basic model schema",
    ]},
    { day: 16, title: "CRUD with MongoDB", tasks: [
      "Create and Read data",
      "Update and Delete data",
      "Error handling with DB",
    ]},
    { day: 17, title: "Express Router Advanced", tasks: [
      "Route parameters",
      "Nested routers",
      "Router middleware",
    ]},
    { day: 18, title: "Express with MySQL", tasks: [
      "mysql2 package",
      "Connecting to MySQL",
      "Basic queries",
    ]},
    { day: 19, title: "Authentication Basics", tasks: [
      "Sessions vs JWT",
      "Login route",
      "Hashing passwords (bcrypt)",
    ]},
    { day: 20, title: "Authentication Advanced", tasks: [
      "JWT authentication",
      "Protecting routes",
      "Role-based auth",
    ]},
    { day: 21, title: "File Uploads", tasks: [
      "multer basics",
      "Single & multiple file uploads",
      "File storage",
    ]},
    { day: 22, title: "Express Security", tasks: [
      "helmet middleware",
      "CORS handling",
      "Rate limiting",
    ]},
    { day: 23, title: "Logging & Debugging", tasks: [
      "morgan logger",
      "debug package",
      "Custom logs",
    ]},
    { day: 24, title: "Async & Error Handling", tasks: [
      "Async/await in Express",
      "Catching async errors",
      "Global error middleware",
    ]},
    { day: 25, title: "Express with GraphQL", tasks: [
      "Setup Apollo Server",
      "Schema & resolvers",
      "Queries & mutations",
    ]},
    { day: 26, title: "WebSockets with Express", tasks: [
      "Socket.io setup",
      "Basic events",
      "Real-time chat example",
    ]},
    { day: 27, title: "Express Deployment Basics", tasks: [
      "Deploy to Heroku",
      "Deploy to Render",
      "Deploy to Vercel",
    ]},
    { day: 28, title: "Production Config", tasks: [
      "Error handling in production",
      "Environment configs",
      "PM2 process manager",
    ]},
    { day: 29, title: "Best Practices", tasks: [
      "Folder structure",
      "Service layer pattern",
      "Validation with Joi/Yup",
    ]},
    { day: 30, title: "Capstone Project", tasks: [
      "Build a full REST API",
      "Authentication + DB",
      "Deploy project",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "expressCourseProgress_v1";
  const themeKey = "expressCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">🚀 Express.js 30-Day Course Tracker</h1>
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
