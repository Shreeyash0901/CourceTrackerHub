import React, { useState, useEffect, useCallback } from "react";

export default function HtmlCourseTracker() {
  const daysData = [
    { day: 1, title: "Introduction to HTML", tasks: [
      "What is HTML?",
      "Structure of an HTML document",
      "Basic tags: <html>, <head>, <body>",
    ]},
    { day: 2, title: "Text Formatting", tasks: [
      "Headings <h1> - <h6>",
      "Paragraphs <p>",
      "Bold, Italic, Underline",
      "Line breaks & Horizontal rules",
    ]},
    { day: 3, title: "Lists in HTML", tasks: [
      "Ordered lists <ol>",
      "Unordered lists <ul>",
      "Definition lists <dl>",
      "Nested lists",
    ]},
    { day: 4, title: "Links & Navigation", tasks: [
      "Anchor tag <a>",
      "Absolute vs Relative links",
      "Linking within the same page (#id)",
      "Open links in new tab",
    ]},
    { day: 5, title: "Images", tasks: [
      "Insert image with <img>",
      "Alt text importance",
      "Image resizing",
      "Image linking",
    ]},
    { day: 6, title: "Tables", tasks: [
      "Basic table structure",
      "<tr>, <td>, <th>",
      "Table borders & captions",
      "Rowspan & Colspan",
    ]},
    { day: 7, title: "Forms Basics", tasks: [
      "<form> element",
      "Input types (text, password, email)",
      "Labels and placeholders",
      "Submit button",
    ]},
    { day: 8, title: "Advanced Forms", tasks: [
      "Radio buttons",
      "Checkboxes",
      "Select dropdowns",
      "Textareas",
    ]},
    { day: 9, title: "Semantic HTML", tasks: [
      "<header>, <footer>, <main>",
      "<article>, <section>, <aside>",
      "<nav>",
      "Why semantic tags matter",
    ]},
    { day: 10, title: "Media Elements", tasks: [
      "Audio with <audio>",
      "Video with <video>",
      "Attributes: controls, autoplay, loop",
    ]},
    { day: 11, title: "iframes", tasks: [
      "Embedding webpages",
      "YouTube videos",
      "Security concerns",
    ]},
    { day: 12, title: "HTML Entities & Symbols", tasks: [
      "Common entities (&lt;, &gt;, &amp;)",
      "Currency symbols",
      "Emoji usage",
    ]},
    { day: 13, title: "Meta Tags & SEO Basics", tasks: [
      "Meta charset",
      "Meta description",
      "Viewport meta tag",
      "Favicons",
    ]},
    { day: 14, title: "Block vs Inline Elements", tasks: [
      "Difference between block & inline",
      "Examples of each",
      "When to use which",
    ]},
    { day: 15, title: "Forms Validation", tasks: [
      "Required fields",
      "Pattern attribute",
      "Min/Max length",
      "Email/Number validation",
    ]},
    { day: 16, title: "HTML5 Input Types", tasks: [
      "Date, Time, Color pickers",
      "Range sliders",
      "File upload",
    ]},
    { day: 17, title: "HTML APIs Intro", tasks: [
      "Geolocation API",
      "Drag & Drop API",
      "Canvas API",
    ]},
    { day: 18, title: "Canvas Basics", tasks: [
      "Create a canvas",
      "Draw shapes",
      "Add text",
    ]},
    { day: 19, title: "SVG in HTML", tasks: [
      "Basic shapes",
      "Scaling SVGs",
      "Inline vs external SVG",
    ]},
    { day: 20, title: "Accessibility in HTML", tasks: [
      "Alt attributes",
      "ARIA roles",
      "Keyboard navigation",
    ]},
    { day: 21, title: "Forms Project", tasks: [
      "Build a registration form",
      "Use multiple input types",
      "Add validation",
    ]},
    { day: 22, title: "Tables Project", tasks: [
      "Build a product price table",
      "Add header & footer",
      "Use colspan/rowspan",
    ]},
    { day: 23, title: "HTML Best Practices", tasks: [
      "Write clean, indented code",
      "Use comments",
      "Consistent naming",
    ]},
    { day: 24, title: "Building a Simple Webpage", tasks: [
      "Add headings, paragraphs",
      "Insert images",
      "Navigation bar",
    ]},
    { day: 25, title: "Forms with GET & POST", tasks: [
      "Difference between GET & POST",
      "Form action & method",
      "Sending data",
    ]},
    { day: 26, title: "HTML5 Semantic Project", tasks: [
      "Build a blog structure",
      "Use article, section, aside",
      "Add nav & footer",
    ]},
    { day: 27, title: "Embedding Content", tasks: [
      "Embed Google Maps",
      "Embed PDFs",
      "Embed social media posts",
    ]},
    { day: 28, title: "Mini Portfolio Page", tasks: [
      "Add bio section",
      "Insert projects",
      "Contact form",
    ]},
    { day: 29, title: "Final Touches", tasks: [
      "Add favicon",
      "SEO meta tags",
      "Accessibility review",
    ]},
    { day: 30, title: "Capstone Project", tasks: [
      "Build a complete personal website",
      "Include forms, tables, media",
      "Validate and optimize",
    ]},
  ];

  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState({});
  const [dark, setDark] = useState(false);

  const storageKey = "htmlCourseProgress_v1";
  const themeKey = "htmlCourseTheme_v1";

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
          <h1 className="text-2xl sm:text-3xl font-bold">📘 HTML 30-Day Course Tracker</h1>
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
