import { useState, useEffect, useCallback } from "react";

export default function JavaScriptCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to JavaScript", tasks: [
      "Setup browser console & Node.js",
      "Hello World in console.log",
      "Variables: var, let, const",
      "Comments in JavaScript",
    ]},
    { day: 2, title: "Data Types", tasks: [
      "Primitive types (string, number, boolean, null, undefined, symbol, bigint)",
      "typeof operator",
      "Dynamic typing",
      "Template literals",
    ]},
    { day: 3, title: "Operators", tasks: [
      "Arithmetic operators",
      "Comparison operators",
      "Logical operators",
      "Ternary operator",
    ]},
    { day: 4, title: "Control Flow", tasks: [
      "if-else statements",
      "switch-case",
      "Loops (for, while, do-while)",
      "break & continue",
    ]},
    { day: 5, title: "Functions", tasks: [
      "Function declarations",
      "Function expressions",
      "Arrow functions",
      "Default parameters",
    ]},
    { day: 6, title: "Arrays - Basics", tasks: [
      "Create & access arrays",
      "Array methods (push, pop, shift, unshift)",
      "forEach loop",
      "map & filter",
    ]},
    { day: 7, title: "Objects - Basics", tasks: [
      "Object literals",
      "Access properties (dot & bracket notation)",
      "Add & delete properties",
      "Object.keys, Object.values, Object.entries",
    ]},
    { day: 8, title: "DOM Manipulation", tasks: [
      "document.getElementById",
      "querySelector & querySelectorAll",
      "Changing text & styles",
      "Creating & removing elements",
    ]},
    { day: 9, title: "Events", tasks: [
      "onclick & addEventListener",
      "Event object",
      "Event bubbling & delegation",
      "Keyboard & mouse events",
    ]},
    { day: 10, title: "Advanced Functions", tasks: [
      "Rest & spread operators",
      "Closures",
      "Callbacks",
      "Immediately Invoked Functions (IIFE)",
    ]},
    { day: 11, title: "ES6 Features - Part 1", tasks: [
      "let vs const vs var",
      "Template literals",
      "Destructuring",
      "Default function parameters",
    ]},
    { day: 12, title: "ES6 Features - Part 2", tasks: [
      "Modules (import/export)",
      "Classes & constructors",
      "Static methods",
      "Inheritance in classes",
    ]},
    { day: 13, title: "Asynchronous JS - Basics", tasks: [
      "setTimeout & setInterval",
      "Callbacks",
      "Event loop & call stack",
      "Promises (resolve, reject, then, catch)",
    ]},
    { day: 14, title: "Async/Await", tasks: [
      "Async functions",
      "Await keyword",
      "Error handling in async/await",
      "Chaining promises",
    ]},
    { day: 15, title: "Error Handling", tasks: [
      "try, catch, finally",
      "throw keyword",
      "Custom errors",
      "Error object",
    ]},
    { day: 16, title: "Array Advanced", tasks: [
      "reduce method",
      "find & findIndex",
      "some & every",
      "sort method",
    ]},
    { day: 17, title: "Objects Advanced", tasks: [
      "Object.assign & spread operator",
      "Object.freeze & seal",
      "Optional chaining",
      "JSON.parse & JSON.stringify",
    ]},
    { day: 18, title: "Browser Storage", tasks: [
      "localStorage",
      "sessionStorage",
      "Cookies",
      "Storing JSON in storage",
    ]},
    { day: 19, title: "JavaScript and HTML Forms", tasks: [
      "Access form inputs",
      "Validation basics",
      "submit event",
      "PreventDefault",
    ]},
    { day: 20, title: "Fetch API", tasks: [
      "fetch basics",
      "GET request",
      "POST request",
      "Handling errors",
    ]},
    { day: 21, title: "JavaScript and APIs", tasks: [
      "JSON response parsing",
      "Display data in DOM",
      "Error handling",
      "Loading indicators",
    ]},
    { day: 22, title: "JavaScript Prototypes", tasks: [
      "Prototype chain",
      "Object.create",
      "Prototype inheritance",
      "hasOwnProperty",
    ]},
    { day: 23, title: "JavaScript Classes Advanced", tasks: [
      "Getters & setters",
      "Private fields (#)",
      "Static properties",
      "Inheritance revisited",
    ]},
    { day: 24, title: "JavaScript Map & Set", tasks: [
      "Map basics",
      "Set basics",
      "WeakMap & WeakSet",
      "Use cases",
    ]},
    { day: 25, title: "Regular Expressions", tasks: [
      "RegExp basics",
      "test & exec methods",
      "String match & replace",
      "Practical regex examples",
    ]},
    { day: 26, title: "JavaScript Date & Time", tasks: [
      "Date object basics",
      "Get & set methods",
      "Formatting dates",
      "Timers with Date",
    ]},
    { day: 27, title: "JavaScript Modules Deep Dive", tasks: [
      "Named vs default exports",
      "Importing modules",
      "Dynamic imports",
      "Bundlers (Webpack basics)",
    ]},
    { day: 28, title: "JavaScript Event Loop Advanced", tasks: [
      "Microtasks vs macrotasks",
      "queueMicrotask",
      "Promise vs setTimeout execution",
    ]},
    { day: 29, title: "Mini Project", tasks: [
      "Build a To-do App",
      "Use localStorage",
      "DOM events",
      "Add/remove tasks dynamically",
    ]},
    { day: 30, title: "Final Capstone Project", tasks: [
      "Build a weather app with API",
      "Use async/await + fetch",
      "Error handling",
      "Responsive UI with DOM",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "jsCourseProgress_v1";
  const themeKey = "jsCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">⚡ JavaScript 30-Day Course Tracker</h1>
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
          <div className="h-full bg-yellow-500 transition-all" style={{ width: `${percent}%` }} />
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
                    allDone ? "bg-yellow-600 text-white" : dark ? "bg-gray-800" : "bg-white"
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
                        className="px-3 py-1.5 text-sm rounded-md bg-yellow-600 text-white hover:opacity-90"
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
                              className="mt-1 h-5 w-5 accent-yellow-500 cursor-pointer"
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
