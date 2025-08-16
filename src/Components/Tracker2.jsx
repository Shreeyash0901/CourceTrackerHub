import { useState, useEffect, useCallback } from "react";

export default function JavaCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to Java", tasks: [
      "Install JDK & IDE (IntelliJ/Eclipse)",
      "Check version with java -version",
      "Write Hello World program",
      "Understand JVM, JRE, JDK",
    ]},
    { day: 2, title: "Java Basics", tasks: [
      "Variables & Data Types",
      "Type Casting",
      "Input/Output with Scanner",
      "Operators in Java",
    ]},
    { day: 3, title: "Control Statements", tasks: [
      "if-else statements",
      "switch-case",
      "Loops (for, while, do-while)",
      "Break & continue",
    ]},
    { day: 4, title: "Methods in Java", tasks: [
      "Define & call methods",
      "Method parameters & return values",
      "Method overloading",
      "Recursion basics",
    ]},
    { day: 5, title: "Arrays", tasks: [
      "1D arrays (create & access)",
      "Looping through arrays",
      "Multidimensional arrays",
      "Array utility methods (Arrays class)",
    ]},
    { day: 6, title: "Strings", tasks: [
      "String basics & immutability",
      "String methods",
      "StringBuilder & StringBuffer",
      "String comparison",
    ]},
    { day: 7, title: "Object-Oriented Basics", tasks: [
      "Classes & Objects",
      "Constructors",
      "this keyword",
      "Garbage Collection",
    ]},
    { day: 8, title: "Encapsulation", tasks: [
      "Private variables & getters/setters",
      "Access modifiers",
      "Packages & import",
    ]},
    { day: 9, title: "Inheritance", tasks: [
      "extends keyword",
      "Method overriding",
      "super keyword",
      "Constructor chaining",
    ]},
    { day: 10, title: "Polymorphism", tasks: [
      "Compile-time polymorphism",
      "Runtime polymorphism",
      "Upcasting & Downcasting",
    ]},
    { day: 11, title: "Abstraction", tasks: [
      "Abstract classes & methods",
      "Interfaces",
      "Multiple inheritance via interfaces",
    ]},
    { day: 12, title: "Exception Handling", tasks: [
      "try, catch, finally",
      "throw vs throws",
      "Checked vs unchecked exceptions",
      "Custom exceptions",
    ]},
    { day: 13, title: "Wrapper Classes & Autoboxing", tasks: [
      "Integer, Double, etc.",
      "Autoboxing & Unboxing",
      "parseInt & valueOf",
    ]},
    { day: 14, title: "Collections Framework Basics", tasks: [
      "List, Set, Map interfaces",
      "ArrayList & LinkedList",
      "HashSet & TreeSet",
      "HashMap & TreeMap",
    ]},
    { day: 15, title: "Generics", tasks: [
      "Generic classes & methods",
      "Bounded type parameters",
      "Wildcards in generics",
    ]},
    { day: 16, title: "Iterators", tasks: [
      "Iterator interface",
      "ListIterator",
      "for-each loop",
    ]},
    { day: 17, title: "Java 8 Features - Part 1", tasks: [
      "Lambda expressions",
      "Functional interfaces",
      "Method references",
    ]},
    { day: 18, title: "Java 8 Features - Part 2", tasks: [
      "Stream API basics",
      "Filter, map, reduce",
      "Optional class",
    ]},
    { day: 19, title: "Multithreading - Basics", tasks: [
      "Thread class & Runnable",
      "Creating & running threads",
      "Thread states",
    ]},
    { day: 20, title: "Multithreading - Advanced", tasks: [
      "Synchronization",
      "wait, notify, notifyAll",
      "ExecutorService",
    ]},
    { day: 21, title: "File Handling", tasks: [
      "File class",
      "FileReader & FileWriter",
      "BufferedReader & BufferedWriter",
      "Serialization & Deserialization",
    ]},
    { day: 22, title: "Java I/O & NIO", tasks: [
      "InputStream & OutputStream",
      "Byte streams vs character streams",
      "Java NIO basics",
    ]},
    { day: 23, title: "Java Database Connectivity (JDBC)", tasks: [
      "JDBC basics",
      "Connect to MySQL/Oracle",
      "Execute queries",
      "PreparedStatement",
    ]},
    { day: 24, title: "Java Annotations", tasks: [
      "@Override, @Deprecated, @SuppressWarnings",
      "Custom annotations",
    ]},
    { day: 25, title: "Java Enums", tasks: [
      "Enum basics",
      "Enum with methods",
      "EnumSet & EnumMap",
    ]},
    { day: 26, title: "Date & Time API", tasks: [
      "LocalDate, LocalTime, LocalDateTime",
      "DateTimeFormatter",
      "Period & Duration",
    ]},
    { day: 27, title: "Java Networking", tasks: [
      "Socket & ServerSocket",
      "DatagramSocket",
      "URL & HttpURLConnection",
    ]},
    { day: 28, title: "Unit Testing with JUnit", tasks: [
      "Setup JUnit",
      "Write test cases",
      "Assertions & annotations",
    ]},
    { day: 29, title: "Mini Project", tasks: [
      "Console-based project (e.g., Student Management)",
      "Use OOP principles",
      "Handle exceptions & collections",
    ]},
    { day: 30, title: "Final Capstone Project", tasks: [
      "Build a CRUD application",
      "Use OOP + Collections + JDBC",
      "Add exception handling & testing",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "javaCourseProgress_v1";
  const themeKey = "javaCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">☕ Java 30-Day Course Tracker</h1>
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
