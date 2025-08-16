import React, { useState, useEffect, useCallback } from "react";

export default function HibernateCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to Hibernate", tasks: [
      "Install Hibernate & IDE setup",
      "Understand ORM concepts",
      "Create first Hibernate project",
      "Configure hibernate.cfg.xml",
    ]},
    { day: 2, title: "Hibernate Configuration", tasks: [
      "SessionFactory configuration",
      "hibernate.cfg.xml setup",
      "Database connection properties",
      "Basic CRUD operations",
    ]},
    { day: 3, title: "Entity Mapping", tasks: [
      "@Entity annotation basics",
      "@Id & @GeneratedValue",
      "Basic field mappings",
      "Table naming conventions",
    ]},
    { day: 4, title: "Advanced Entity Mapping", tasks: [
      "Column mapping with @Column",
      "Temporal types (@Temporal)",
      "Enumerated types (@Enumerated)",
      "Transient fields (@Transient)",
    ]},
    { day: 5, title: "Relationships - One-to-One", tasks: [
      "@OneToOne mapping",
      "Unidirectional vs Bidirectional",
      "Cascade operations",
      "Fetch types (EAGER vs LAZY)",
    ]},
    { day: 6, title: "Relationships - One-to-Many", tasks: [
      "@OneToMany mapping",
      "@ManyToOne mapping",
      "Collection mapping (List, Set)",
      "JoinColumn configuration",
    ]},
    { day: 7, title: "Relationships - Many-to-Many", tasks: [
      "@ManyToMany mapping",
      "JoinTable configuration",
      "Bidirectional many-to-many",
      "Cascade in many-to-many",
    ]},
    { day: 8, title: "HQL & JPQL", tasks: [
      "HQL syntax basics",
      "Named queries (@NamedQuery)",
      "Parameter binding",
      "Pagination with HQL",
    ]},
    { day: 9, title: "Criteria API", tasks: [
      "CriteriaBuilder usage",
      "CriteriaQuery creation",
      "Predicates & restrictions",
      "Sorting & pagination",
    ]},
    { day: 10, title: "Native SQL Queries", tasks: [
      "Native SQL with createSQLQuery",
      "Result transformers",
      "Stored procedures",
      "Complex joins with SQL",
    ]},
    { day: 11, title: "Caching in Hibernate", tasks: [
      "First-level cache (Session)",
      "Second-level cache configuration",
      "Query cache setup",
      "Cache providers (EHCache, Infinispan)",
    ]},
    { day: 12, title: "Transactions", tasks: [
      "Transaction management basics",
      "@Transactional annotation",
      "Isolation levels",
      "Propagation behaviors",
    ]},
    { day: 13, title: "Optimistic Locking", tasks: [
      "@Version annotation",
      "Optimistic locking strategy",
      "Handling stale data",
      "Conflict resolution",
    ]},
    { day: 14, title: "Pessimistic Locking", tasks: [
      "Pessimistic locking concepts",
      "LockModeType usage",
      "Deadlock handling",
      "Performance considerations",
    ]},
    { day: 15, title: "Inheritance Mapping", tasks: [
      "Single table inheritance",
      "Joined table inheritance",
      "Table per class inheritance",
      "@DiscriminatorColumn usage",
    ]},
    { day: 16, title: "Component Mapping", tasks: [
      "@Embeddable & @Embedded",
      "Value objects mapping",
      "Component collections",
      "Override column names",
    ]},
    { day: 17, title: "Custom Types", tasks: [
      "UserType implementation",
      "CompositeUserType",
      "EnumType customization",
      "JSON column mapping",
    ]},
    { day: 18, title: "Batch Processing", tasks: [
      "Batch inserts & updates",
      "StatelessSession usage",
      "Batch size configuration",
      "Performance optimization",
    ]},
    { day: 19, title: "Spring Data JPA with Hibernate", tasks: [
      "Spring Data JPA setup",
      "Repository interfaces",
      "Custom repository methods",
      "QueryDSL integration",
    ]},
    { day: 20, title: "Hibernate Validator", tasks: [
      "Bean validation annotations",
      "@NotNull, @Size, @Email",
      "Custom validators",
      "Validation groups",
    ]},
    { day: 21, title: "Hibernate Envers", tasks: [
      "Audit logging setup",
      "@Audited annotation",
      "Revision history tracking",
      "Querying audit data",
    ]},
    { day: 22, title: "Hibernate Search", tasks: [
      "Full-text search setup",
      "@Indexed annotation",
      "Lucene integration",
      "Complex search queries",
    ]},
    { day: 23, title: "Performance Tuning", tasks: [
      "N+1 query problem",
      "Fetch strategies optimization",
      "Batch fetching",
      "Query plan analysis",
    ]},
    { day: 24, title: "Connection Pooling", tasks: [
      "HikariCP configuration",
      "Connection pool settings",
      "Monitoring connection usage",
      "Tuning pool parameters",
    ]},
    { day: 25, title: "Database Migration", tasks: [
      "Flyway integration",
      "Liquibase setup",
      "Versioned migrations",
      "Rollback strategies",
    ]},
    { day: 26, title: "Hibernate with Spring Boot", tasks: [
      "Spring Boot starter data JPA",
      "Auto-configuration",
      "Application properties",
      "DevTools integration",
    ]},
    { day: 27, title: "Advanced Mapping", tasks: [
      "ElementCollection mapping",
      "Map key-value pairs",
      "Sorted collections",
      "Custom collection types",
    ]},
    { day: 28, title: "Hibernate Tools", tasks: [
      "Hibernate Tools plugin",
      "Reverse engineering",
      "Schema generation",
      "DDL auto-generation",
    ]},
    { day: 29, title: "Testing with Hibernate", tasks: [
      "H2 database for testing",
      "Test configuration",
      "Data setup & cleanup",
      "Integration testing",
    ]},
    { day: 30, title: "Final Hibernate Project", tasks: [
      "Complete CRUD application",
      "Complex relationships",
      "Performance optimization",
      "Production-ready setup",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "hibernateCourseProgress_v1";
  const themeKey = "hibernateCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">🐘 Hibernate 30-Day Course Tracker</h1>
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
