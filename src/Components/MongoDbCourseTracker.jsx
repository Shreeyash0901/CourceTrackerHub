import React, { useState, useEffect, useCallback } from "react";

export default function MongoDbCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to MongoDB", tasks: [
      "Install MongoDB locally or use MongoDB Atlas",
      "Start MongoDB service",
      "Connect using MongoDB Compass",
      "Understand NoSQL vs SQL databases",
    ]},
    { day: 2, title: "MongoDB Basics", tasks: [
      "Create your first database",
      "Create collections",
      "Insert your first document",
      "Understand JSON-like documents",
    ]},
    { day: 3, title: "CRUD Operations - Create", tasks: [
      "insertOne() method",
      "insertMany() method",
      "Understanding ObjectId",
      "Insert with validation",
    ]},
    { day: 4, title: "CRUD Operations - Read", tasks: [
      "find() method basics",
      "findOne() method",
      "Query operators ($eq, $ne, $gt, $lt)",
      "Projection in queries",
    ]},
    { day: 5, title: "CRUD Operations - Update", tasks: [
      "updateOne() method",
      "updateMany() method",
      "$set operator",
      "$inc, $push, $pull operators",
    ]},
    { day: 6, title: "CRUD Operations - Delete", tasks: [
      "deleteOne() method",
      "deleteMany() method",
      "drop collection",
      "drop database",
    ]},
    { day: 7, title: "Query Operators Deep Dive", tasks: [
      "Comparison operators ($gt, $gte, $lt, $lte)",
      "Logical operators ($and, $or, $not)",
      "Element operators ($exists, $type)",
      "Array operators ($in, $nin)",
    ]},
    { day: 8, title: "Array Operations", tasks: [
      "Query arrays",
      "Update array elements",
      "$push, $pop, $pull operators",
      "Array indexing",
    ]},
    { day: 9, title: "Embedded Documents", tasks: [
      "Create embedded documents",
      "Query embedded fields",
      "Update embedded documents",
      "Array of embedded documents",
    ]},
    { day: 10, title: "Indexes", tasks: [
      "Create single field indexes",
      "Create compound indexes",
      "Understand index types",
      "Index performance analysis",
    ]},
    { day: 11, title: "Aggregation Framework", tasks: [
      "Aggregation pipeline basics",
      "$match stage",
      "$group stage",
      "$project stage",
    ]},
    { day: 12, title: "Aggregation Operators", tasks: [
      "$sum, $avg, $min, $max",
      "$push, $addToSet",
      "$unwind operator",
      "Complex aggregations",
    ]},
    { day: 13, title: "MongoDB Compass", tasks: [
      "Install MongoDB Compass",
      "Visual CRUD operations",
      "Query builder usage",
      "Performance analysis",
    ]},
    { day: 14, title: "Schema Design", tasks: [
      "Embedding vs referencing",
      "One-to-many relationships",
      "Many-to-many relationships",
      "Denormalization strategies",
    ]},
    { day: 15, title: "Mongoose ODM", tasks: [
      "Install Mongoose",
      "Create schemas",
      "Define models",
      "Basic CRUD with Mongoose",
    ]},
    { day: 16, title: "Mongoose Advanced", tasks: [
      "Schema validation",
      "Virtual properties",
      "Instance methods",
      "Static methods",
    ]},
    { day: 17, title: "Mongoose Relationships", tasks: [
      "Population (populate)",
      "References between collections",
      "Subdocuments",
      "Deep population",
    ]},
    { day: 18, title: "Mongoose Middleware", tasks: [
      "Pre-save hooks",
      "Post-save hooks",
      "Pre-find hooks",
      "Error handling middleware",
    ]},
    { day: 19, title: "Text Search", tasks: [
      "Text indexes",
      "$text operator",
      "$search aggregation",
      "Search scoring",
    ]},
    { day: 20, title: "Geospatial Queries", tasks: [
      "2dsphere indexes",
      "$near operator",
      "$geoWithin operator",
      "Location-based queries",
    ]},
    { day: 21, title: "Transactions", tasks: [
      "Multi-document transactions",
      "ACID properties in MongoDB",
      "Transaction rollback",
      "Error handling",
    ]},
    { day: 22, title: "Change Streams", tasks: [
      "Real-time change notifications",
      "Watch collections",
      "Handle change events",
      "Resume tokens",
    ]},
    { day: 23, title: "MongoDB Atlas", tasks: [
      "Create Atlas cluster",
      "Connect to Atlas",
      "Database user management",
      "Network access configuration",
    ]},
    { day: 24, title: "Performance Optimization", tasks: [
      "Explain query plans",
      "Index optimization",
      "Query profiling",
      "Connection pooling",
    ]},
    { day: 25, title: "Backup & Recovery", tasks: [
      "mongodump & mongorestore",
      "Atlas backup features",
      "Point-in-time recovery",
      "Automated backups",
    ]},
    { day: 26, title: "Security", tasks: [
      "Authentication & authorization",
      "Role-based access control",
      "SSL/TLS configuration",
      "IP whitelisting",
    ]},
    { day: 27, title: "MongoDB with Express", tasks: [
      "Express + MongoDB setup",
      "RESTful API with MongoDB",
      "Error handling",
      "Validation middleware",
    ]},
    { day: 28, title: "MongoDB with Node.js", tasks: [
      "Native MongoDB driver",
      "Connection management",
      "Async/await operations",
      "Error handling patterns",
    ]},
    { day: 29, title: "Monitoring & Tools", tasks: [
      "MongoDB monitoring tools",
      "Performance metrics",
      "Slow query analysis",
      "Database profiling",
    ]},
    { day: 30, title: "Final MongoDB Project", tasks: [
      "Complete CRUD application",
      "Advanced queries & aggregations",
      "Performance optimization",
      "Production deployment",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "mongodbCourseProgress_v1";
  const themeKey = "mongodbCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">🍃 MongoDB 30-Day Course Tracker</h1>
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
