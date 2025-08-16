import React, { useState, useEffect, useCallback } from "react";

export default function AdvanceJavaCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to Advanced Java", tasks: [
      "Difference between Core Java & Advanced Java",
      "Overview of J2EE",
      "Setup IDE (Eclipse/IntelliJ)",
      "First servlet program",
    ]},
    { day: 2, title: "Servlet Basics", tasks: [
      "Servlet lifecycle (init, service, destroy)",
      "Configure servlet in web.xml",
      "Annotation-based servlet",
      "Deploy servlet on Tomcat",
    ]},
    { day: 3, title: "Handling Requests & Responses", tasks: [
      "GET vs POST",
      "Request parameters & attributes",
      "Response headers & content type",
    ]},
    { day: 4, title: "Session Management", tasks: [
      "Cookies in servlets",
      "HttpSession API",
      "URL rewriting",
    ]},
    { day: 5, title: "JSP Basics", tasks: [
      "JSP lifecycle",
      "Directives (page, include, taglib)",
      "Scripting elements",
    ]},
    { day: 6, title: "JSP with JavaBeans", tasks: [
      "JavaBeans intro",
      "useBean, setProperty, getProperty tags",
      "MVC with JSP & Servlets",
    ]},
    { day: 7, title: "JSTL & EL", tasks: [
      "Expression Language basics",
      "Core JSTL tags",
      "Conditional & looping tags",
    ]},
    { day: 8, title: "JDBC Basics", tasks: [
      "JDBC drivers",
      "Connection, Statement, ResultSet",
      "Executing queries",
    ]},
    { day: 9, title: "Advanced JDBC", tasks: [
      "PreparedStatement",
      "CallableStatement",
      "Transactions",
    ]},
    { day: 10, title: "DAO Pattern", tasks: [
      "Create DAO layer",
      "CRUD operations with DAO",
      "Best practices",
    ]},
    { day: 11, title: "MVC Architecture", tasks: [
      "Understand MVC in web apps",
      "Controller servlet",
      "Integrating DAO with JSP",
    ]},
    { day: 12, title: "Filters in Servlets", tasks: [
      "What are filters?",
      "Logging & authentication filters",
      "Chaining filters",
    ]},
    { day: 13, title: "Listeners in Servlets", tasks: [
      "ServletContextListener",
      "HttpSessionListener",
      "Practical use cases",
    ]},
    { day: 14, title: "Mini Project: Login System", tasks: [
      "Create login JSP form",
      "Validate user with JDBC",
      "Maintain session",
      "Logout functionality",
    ]},
    { day: 15, title: "Intro to Hibernate", tasks: [
      "What is ORM?",
      "Setup Hibernate",
      "Basic entity mapping",
    ]},
    { day: 16, title: "Hibernate CRUD", tasks: [
      "Insert entity",
      "Retrieve entity",
      "Update & delete entity",
    ]},
    { day: 17, title: "Hibernate Queries", tasks: [
      "HQL basics",
      "Named queries",
      "Criteria API",
    ]},
    { day: 18, title: "Hibernate Relationships", tasks: [
      "One-to-One mapping",
      "One-to-Many mapping",
      "Many-to-Many mapping",
    ]},
    { day: 19, title: "Spring Basics", tasks: [
      "Spring Core intro",
      "Dependency Injection",
      "Bean configuration",
    ]},
    { day: 20, title: "Spring MVC", tasks: [
      "DispatcherServlet",
      "Controller annotations",
      "ViewResolver setup",
    ]},
    { day: 21, title: "Spring + Hibernate Integration", tasks: [
      "Configure Hibernate in Spring",
      "DAO with HibernateTemplate",
      "Transaction management",
    ]},
    { day: 22, title: "RESTful Web Services", tasks: [
      "Intro to REST",
      "Spring REST Controller",
      "Return JSON response",
    ]},
    { day: 23, title: "JSON & XML Handling", tasks: [
      "Parse JSON with Jackson",
      "Return XML response",
    ]},
    { day: 24, title: "Spring Security Basics", tasks: [
      "Setup Spring Security",
      "Authentication & authorization",
      "Role-based access",
    ]},
    { day: 25, title: "JPA with Spring Data", tasks: [
      "Setup Spring Data JPA",
      "Repositories",
      "Query methods",
    ]},
    { day: 26, title: "File Uploads in Java EE", tasks: [
      "MultipartConfig",
      "Handle file upload in servlet",
      "Store file in DB",
    ]},
    { day: 27, title: "Testing Java EE Apps", tasks: [
      "JUnit basics",
      "Mockito intro",
      "Test DAO & Services",
    ]},
    { day: 28, title: "Dockerizing Java Apps", tasks: [
      "Dockerfile for Spring Boot app",
      "Build & run container",
      "Connect container with DB",
    ]},
    { day: 29, title: "Deployment", tasks: [
      "Deploy WAR on Tomcat",
      "Deploy Spring Boot JAR",
      "Cloud deployment (Heroku/Render)",
    ]},
    { day: 30, title: "Capstone Project", tasks: [
      "Full-stack web app with Spring + Hibernate",
      "Authentication + CRUD",
      "Deploy online",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "advanceJavaCourseProgress_v1";
  const themeKey = "advanceJavaCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">☕ Advance Java 30-Day Course Tracker</h1>
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
