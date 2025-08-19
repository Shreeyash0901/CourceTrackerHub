// Pages
// Course Trackers
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import Tracker from "./Components/Tracker"; // Node.js
import JavaCourseTracker from "./Components/Tracker2";
import CSSCourseTracker from "./Components/CssCourseTracker";
import HtmlCourseTracker from "./Components/HtmlCourseTracker";
import JavaScriptTracker from "./Components/Tracker3_javascript";
import ReactCourseTracker from "./Components/ReactCourseTracker";
import AdvancedJavaTracker from "./Components/JavaAdvancedTracker";
import SpringCourseTracker from "./Components/SpringCourseTracker";
import ExpressCourseTracker from "./Components/ExpressCourseTracker";
import MongoDbCourseTracker from "./Components/MongoDbCourseTracker";
import HibernateCourseTracker from "./Components/HibernateCourseTracker";
import AllProgressTracker from "./Components/AllProgressTracker";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <main className="flex-grow">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* Courses */}
          <Route path="/node" element={<Tracker />} />
          <Route path="/java" element={<JavaCourseTracker />} />
          <Route path="/java-advanced" element={<AdvancedJavaTracker />} />
          <Route path="/javascript" element={<JavaScriptTracker />} />
          <Route path="/html" element={<HtmlCourseTracker />} />
          <Route path="/css" element={<CSSCourseTracker />} />
          <Route path="/react" element={<ReactCourseTracker />} />
          <Route path="/express" element={<ExpressCourseTracker />} />
          <Route path="/mongodb" element={<MongoDbCourseTracker />} />
          <Route path="/spring" element={<SpringCourseTracker />} />
          <Route path="/hibernate" element={<HibernateCourseTracker />} />
          <Route path="/all-progress" element={<AllProgressTracker />} />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
