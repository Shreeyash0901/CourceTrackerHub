import React, { useState, useEffect, useCallback } from "react";

export default function CssCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to CSS", tasks: [
      "What is CSS?",
      "Inline, Internal, External CSS",
      "Basic Syntax & Selectors",
    ]},
    { day: 2, title: "Selectors & Colors", tasks: [
      "Element, Class, ID selectors",
      "Grouping selectors",
      "Colors: names, HEX, RGB, HSL",
    ]},
    { day: 3, title: "Backgrounds", tasks: [
      "Background-color",
      "Background-image",
      "Background-repeat & position",
      "Background-size & attachment",
    ]},
    { day: 4, title: "Text Styling", tasks: [
      "Font-family & Web-safe fonts",
      "Font-size, weight, style",
      "Text-align, decoration, transform",
      "Line-height & letter-spacing",
    ]},
    { day: 5, title: "Box Model", tasks: [
      "Content, Padding, Border, Margin",
      "Box-sizing: content-box vs border-box",
      "Outline",
    ]},
    { day: 6, title: "Borders & Shadows", tasks: [
      "Border styles & radius",
      "Box-shadow",
      "Text-shadow",
    ]},
    { day: 7, title: "Width & Height", tasks: [
      "Auto vs fixed",
      "Max-width, min-width",
      "Viewport units (vh, vw)",
    ]},
    { day: 8, title: "Display & Visibility", tasks: [
      "Display: block, inline, inline-block",
      "None vs visibility: hidden",
      "Overflow handling",
    ]},
    { day: 9, title: "Positioning", tasks: [
      "Static, Relative, Absolute, Fixed, Sticky",
      "z-index",
      "Top/Right/Bottom/Left properties",
    ]},
    { day: 10, title: "Flexbox Basics", tasks: [
      "Container properties: display: flex",
      "justify-content",
      "align-items",
      "flex-direction",
    ]},
    { day: 11, title: "Flexbox Advanced", tasks: [
      "align-content",
      "flex-wrap",
      "flex-grow, shrink, basis",
      "Order property",
    ]},
    { day: 12, title: "CSS Grid Basics", tasks: [
      "display: grid",
      "grid-template-rows/columns",
      "gap",
      "fr units",
    ]},
    { day: 13, title: "CSS Grid Advanced", tasks: [
      "Grid areas",
      "Grid item positioning",
      "auto-fit & auto-fill",
    ]},
    { day: 14, title: "Units & Measurements", tasks: [
      "px, em, rem",
      "%, vh, vw",
      "ch, ex",
    ]},
    { day: 15, title: "Pseudo-classes & Elements", tasks: [
      ":hover, :focus, :active",
      ":first-child, :last-child, :nth-child",
      "::before, ::after",
    ]},
    { day: 16, title: "Transitions", tasks: [
      "transition-property",
      "transition-duration",
      "timing functions",
    ]},
    { day: 17, title: "Animations", tasks: [
      "@keyframes",
      "animation-name, duration, iteration",
      "infinite & alternate",
    ]},
    { day: 18, title: "Transforms", tasks: [
      "translate, rotate, scale, skew",
      "transform-origin",
      "2D vs 3D transforms",
    ]},
    { day: 19, title: "Responsive Design Basics", tasks: [
      "Viewport meta tag",
      "Media queries",
      "Mobile-first vs Desktop-first",
    ]},
    { day: 20, title: "Advanced Media Queries", tasks: [
      "min-width & max-width",
      "orientation",
      "prefers-color-scheme",
    ]},
    { day: 21, title: "CSS Variables", tasks: [
      "Declaring variables",
      "Using var()",
      "Theming with CSS variables",
    ]},
    { day: 22, title: "CSS Functions", tasks: [
      "calc()",
      "min(), max(), clamp()",
      "attr()",
    ]},
    { day: 23, title: "Clip & Masking", tasks: [
      "clip-path basics",
      "shapes (circle, polygon)",
      "mask-image",
    ]},
    { day: 24, title: "Filters", tasks: [
      "blur, brightness, contrast",
      "grayscale, sepia, hue-rotate",
    ]},
    { day: 25, title: "Gradients", tasks: [
      "Linear gradients",
      "Radial gradients",
      "Conic gradients",
    ]},
    { day: 26, title: "Custom Fonts & Icons", tasks: [
      "@font-face",
      "Google Fonts",
      "Font Awesome / Icon sets",
    ]},
    { day: 27, title: "Responsive Layout Project", tasks: [
      "Build a responsive navbar",
      "Responsive grid layout",
      "Responsive images",
    ]},
    { day: 28, title: "CSS Frameworks Intro", tasks: [
      "Bootstrap basics",
      "Tailwind basics",
      "Utility classes vs components",
    ]},
    { day: 29, title: "CSS Best Practices", tasks: [
      "Organizing stylesheets",
      "Avoiding !important",
      "Comments & consistency",
    ]},
    { day: 30, title: "Capstone Project", tasks: [
      "Build a responsive portfolio website",
      "Use flexbox & grid",
      "Add animations & theming",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "cssCourseProgress_v1";
  const themeKey = "cssCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">🎨 CSS 30-Day Course Tracker</h1>
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
