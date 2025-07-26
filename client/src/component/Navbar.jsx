import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Install: npm install framer-motion

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Faculty", path: "/faculty" },
    { name: "About", path: "/about" },
  ];

  // ✅ Hide Navbar on Faculty & About pages
  if (location.pathname === "/faculty" || location.pathname === "/about") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4 text-white">
        {/* ✅ Logo Section with Letter-by-Letter Animation */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded" />
          <motion.span
            className="font-poppins text-lg tracking-wide text-white"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05, // ✅ Medium speed (0.05s per letter)
                },
              },
            }}
          >
            {"Alva's Institute Of Engineering & Technology"
              .split("")
              .map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
          </motion.span>
        </div>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`transition-all hover:text-blue-400 ${
                location.pathname === link.path
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/90 text-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`transition-all hover:text-blue-400 ${
                location.pathname === link.path
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
