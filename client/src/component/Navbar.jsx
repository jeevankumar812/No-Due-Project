import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Faculty", path: "/faculty" },
    { name: "About", path: "/about" },
  ];

  const location = useLocation();

  // ✅ Hide Navbar on Faculty & About pages
  if (location.pathname === "/faculty" || location.pathname === "/about") {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-center px-6 md:px-16 lg:px-24 
      text-white py-6 z-50`}
      style={{
        background: "transparent", // ✅ No background color
      }}
    >
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="hover:text-blue-300 transition-all"
          >
            {link.name}
          </Link>
        ))}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
