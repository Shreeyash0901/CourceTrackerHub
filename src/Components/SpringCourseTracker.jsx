import { useState, useEffect, useCallback } from "react";

export default function SpringCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to Spring", tasks: [
      "Install Spring Boot & IDE setup",
      "Create first Spring Boot project",
      "Understand Spring vs Spring Boot",
      "Run Hello World Spring Boot app",
    ]},
    { day: 2, title: "Spring Boot Basics", tasks: [
      "Spring Boot project structure",
      "application.properties configuration",
      "Spring Boot starters",
      "Spring Boot DevTools",
    ]},
    { day: 3, title: "Spring Core Concepts", tasks: [
      "Dependency Injection (DI)",
      "Inversion of Control (IoC)",
      "Spring Beans & ApplicationContext",
      "Component scanning",
    ]},
    { day: 4, title: "Spring Annotations", tasks: [
      "@Component, @Service, @Repository",
      "@Autowired & @Qualifier",
      "@Configuration & @Bean",
      "@Value for properties",
    ]},
    { day: 5, title: "Spring MVC", tasks: [
      "Spring MVC architecture",
      "@Controller & @RestController",
      "@RequestMapping & HTTP methods",
      "Path variables & request parameters",
    ]},
    { day: 6, title: "Spring Data JPA", tasks: [
      "JPA vs Hibernate vs Spring Data JPA",
      "Entity & Repository setup",
      "CRUD operations with JpaRepository",
      "Custom query methods",
    ]},
    { day: 7, title: "Spring Security Basics", tasks: [
      "Spring Security configuration",
      "In-memory authentication",
      "Form-based login",
      "Basic security rules",
    ]},
    { day: 8, title: "Spring Security Advanced", tasks: [
      "JWT authentication",
      "Role-based authorization",
      "Method security with @PreAuthorize",
      "Custom UserDetailsService",
    ]},
    { day: 9, title: "Spring Validation", tasks: [
      "Bean validation with @Valid",
      "Custom validation annotations",
      "Global exception handling",
      "Validation error responses",
    ]},
    { day: 10, title: "Spring AOP", tasks: [
      "Aspect-Oriented Programming concepts",
      "@Aspect & @Before/@After annotations",
      "Pointcut expressions",
      "Logging with AOP",
    ]},
    { day: 11, title: "Spring Testing", tasks: [
      "Spring Boot Test framework",
      "@SpringBootTest annotation",
      "MockMvc for controller testing",
      "Test configuration with @TestConfiguration",
    ]},
    { day: 12, title: "Spring Profiles", tasks: [
      "Environment-specific configurations",
      "application-dev.properties",
      "application-prod.properties",
      "Profile activation",
    ]},
    { day: 13, title: "Spring Boot Actuator", tasks: [
      "Health checks & metrics",
      "Custom endpoints",
      "Monitoring with Actuator",
      "Security for Actuator endpoints",
    ]},
    { day: 14, title: "Spring Cloud Config", tasks: [
      "Centralized configuration",
      "Config Server setup",
      "Git-backed configuration",
      "Refresh configuration at runtime",
    ]},
    { day: 15, title: "Spring Cloud Gateway", tasks: [
      "API Gateway concepts",
      "Spring Cloud Gateway setup",
      "Routing configuration",
      "Filter chains",
    ]},
    { day: 16, title: "Spring Cloud Eureka", tasks: [
      "Service discovery concepts",
      "Eureka Server setup",
      "Eureka Client registration",
      "Load balancing with Eureka",
    ]},
    { day: 17, title: "Spring Cloud Circuit Breaker", tasks: [
      "Circuit breaker pattern",
      "Resilience4j integration",
      "Fallback methods",
      "Bulkhead pattern",
    ]},
    { day: 18, title: "Spring Batch", tasks: [
      "Batch processing concepts",
      "Job & Step configuration",
      "ItemReader & ItemWriter",
      "Chunk-oriented processing",
    ]},
    { day: 19, title: "Spring Integration", tasks: [
      "Enterprise Integration Patterns",
      "Message channels",
      "Message endpoints",
      "Integration with external systems",
    ]},
    { day: 20, title: "Spring WebFlux", tasks: [
      "Reactive programming concepts",
      "WebFlux vs Spring MVC",
      "Mono & Flux types",
      "Reactive controllers",
    ]},
    { day: 21, title: "Spring Data MongoDB", tasks: [
      "MongoDB integration",
      "MongoRepository setup",
      "Document mapping",
      "Query methods for MongoDB",
    ]},
    { day: 22, title: "Spring Security OAuth2", tasks: [
      "OAuth2 concepts",
      "Spring Security OAuth2 setup",
      "Authorization server",
      "Resource server configuration",
    ]},
    { day: 23, title: "Spring Cloud Stream", tasks: [
      "Message-driven microservices",
      "Kafka/RabbitMQ integration",
      "Binding configuration",
      "Error handling",
    ]},
    { day: 24, title: "Spring Cloud Sleuth", tasks: [
      "Distributed tracing",
      "Zipkin integration",
      "Trace & span concepts",
      "Correlation IDs",
    ]},
    { day: 25, title: "Spring Boot Admin", tasks: [
      "Admin dashboard setup",
      "Application monitoring",
      "Health check visualization",
      "Notification configuration",
    ]},
    { day: 26, title: "Spring Cache", tasks: [
      "Caching strategies",
      "@Cacheable, @CacheEvict",
      "Cache providers (Redis, Caffeine)",
      "Cache configuration",
    ]},
    { day: 27, title: "Spring Scheduling", tasks: [
      "@Scheduled annotation",
      "Cron expressions",
      "Async processing with @Async",
      "Task scheduling configuration",
    ]},
    { day: 28, title: "Spring Boot Docker", tasks: [
      "Dockerize Spring Boot app",
      "Multi-stage builds",
      "Docker Compose with Spring",
      "Container orchestration basics",
    ]},
    { day: 29, title: "Spring Boot Kubernetes", tasks: [
      "Kubernetes deployment",
      "Spring Cloud Kubernetes",
      "ConfigMaps & Secrets",
      "Service discovery in K8s",
    ]},
    { day: 30, title: "Final Spring Project", tasks: [
      "Build microservices architecture",
      "Implement all learned concepts",
      "Add monitoring & logging",
      "Deploy to cloud platform",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "springCourseProgress_v1";
  const themeKey = "springCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">🌱 Spring Framework 30-Day Course Tracker</h1>
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
