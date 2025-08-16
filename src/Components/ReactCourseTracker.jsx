import React, { useState, useEffect, useCallback } from "react";

export default function ReactCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to React", tasks: [
      "What is React?",
      "Install Node.js & npm",
      "Create React App / Vite setup",
    ]},
    { day: 2, title: "JSX & Components", tasks: [
      "What is JSX?",
      "Functional Components",
      "Props basics",
    ]},
    { day: 3, title: "React State", tasks: [
      "useState basics",
      "Updating state",
      "State in components",
    ]},
    { day: 4, title: "Handling Events", tasks: [
      "onClick events",
      "Forms & inputs",
      "Event handlers",
    ]},
    { day: 5, title: "Conditional Rendering", tasks: [
      "if/else rendering",
      "Ternary operators",
      "Logical && rendering",
    ]},
    { day: 6, title: "Lists & Keys", tasks: [
      "Rendering arrays",
      "Unique keys",
      "Dynamic lists",
    ]},
    { day: 7, title: "useEffect Hook", tasks: [
      "Effect basics",
      "Dependency array",
      "Cleanup function",
    ]},
    { day: 8, title: "Forms in React", tasks: [
      "Controlled components",
      "useState with forms",
      "Handling submissions",
    ]},
    { day: 9, title: "Props Drilling", tasks: [
      "Passing props deeply",
      "Problems with drilling",
      "Solutions overview",
    ]},
    { day: 10, title: "React Context API", tasks: [
      "Create context",
      "useContext hook",
      "Avoiding props drilling",
    ]},
    { day: 11, title: "Custom Hooks", tasks: [
      "What are custom hooks?",
      "Build a simple custom hook",
      "Reusing logic",
    ]},
    { day: 12, title: "React Router Basics", tasks: [
      "Install react-router-dom",
      "BrowserRouter setup",
      "Link & Route",
    ]},
    { day: 13, title: "React Router Advanced", tasks: [
      "Nested routes",
      "useParams",
      "Navigate programmatically",
    ]},
    { day: 14, title: "React Styling", tasks: [
      "CSS Modules",
      "Styled Components",
      "Tailwind basics",
    ]},
    { day: 15, title: "React Icons & UI Libraries", tasks: [
      "React Icons",
      "Material UI",
      "ShadCN / Chakra UI",
    ]},
    { day: 16, title: "Fetching Data", tasks: [
      "fetch API",
      "Axios basics",
      "Display API data",
    ]},
    { day: 17, title: "Async & Loading States", tasks: [
      "Loading indicators",
      "Error handling",
      "Conditional rendering",
    ]},
    { day: 18, title: "React Performance Basics", tasks: [
      "React.memo",
      "useMemo",
      "useCallback",
    ]},
    { day: 19, title: "React DevTools", tasks: [
      "Install DevTools",
      "Inspect components",
      "Debug state & props",
    ]},
    { day: 20, title: "React Forms Advanced", tasks: [
      "Form validation",
      "React Hook Form",
      "Yup for validation",
    ]},
    { day: 21, title: "State Management Intro", tasks: [
      "Why state management?",
      "Context vs Redux",
      "Zustand basics",
    ]},
    { day: 22, title: "Redux Basics", tasks: [
      "Install Redux Toolkit",
      "Slices & reducers",
      "Dispatch actions",
    ]},
    { day: 23, title: "Redux Advanced", tasks: [
      "Async with Redux",
      "Redux Thunk",
      "Persist state",
    ]},
    { day: 24, title: "React Query", tasks: [
      "Setup React Query",
      "Fetching & caching",
      "Mutations",
    ]},
    { day: 25, title: "React with Firebase", tasks: [
      "Setup Firebase",
      "Auth with Firebase",
      "CRUD with Firestore",
    ]},
    { day: 26, title: "React Authentication", tasks: [
      "Private routes",
      "JWT handling",
      "Role-based access",
    ]},
    { day: 27, title: "React Testing Basics", tasks: [
      "Jest setup",
      "React Testing Library",
      "Unit tests",
    ]},
    { day: 28, title: "React Deployment", tasks: [
      "Deploy to Vercel",
      "Deploy to Netlify",
      "Static export",
    ]},
    { day: 29, title: "React Best Practices", tasks: [
      "Folder structure",
      "Reusable components",
      "Error boundaries",
    ]},
    { day: 30, title: "Capstone Project", tasks: [
      "Build a complete React app",
      "API integration",
      "Deploy project",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "reactCourseProgress_v1";
  const themeKey = "reactCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">⚛️ React.js 30-Day Course Tracker</h1>
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
