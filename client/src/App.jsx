import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar"; // ✅ Ensure this import exists
import Home from "./pages/Home";
import Student from "./pages/Student";
import StudentDashboard from "./pages/StudentDashboard";
import Faculty from "./pages/Faculty";
import FacultyDashboard from "./pages/FacultyDashboard";

export default function App() {
  const location = useLocation(); // ✅ Correct way

  return (
    <div>
      {location.pathname === "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Student />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
      </Routes>
    </div>
  );
}
