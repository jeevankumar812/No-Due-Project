import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center text-white"
      style={{
        backgroundImage: "url('/bii.jpg')", // ✅ Make sure the image is in public/
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      {/* ✅ Top-right Clean Logo */}
      <div className="absolute top-6 right-8 z-20">
        <img
          src="/logo.png"
          alt="College Logo"
          className="h-16 w-auto drop-shadow-md"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl text-left px-6 md:px-16 lg:px-24">
        
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight mt-4 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Are you tired of manual <br />
          <span className="text-blue-400">No Due clearance?</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-gray-200 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Upload assignments, get approvals, and download your
          <strong className="text-white"> No Due certificate</strong> — all in
          one place, 100% paperless.
        </motion.p>

        {/* ✅ Scroll to CollegeImages */}
        <Link to="college-images" smooth={true} duration={800}>
          <motion.button
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white 
                       font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 
                       transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
          >
            Explore More ↓
            <span className="absolute inset-0 bg-white/10 blur-lg rounded-full opacity-50"></span>
          </motion.button>
        </Link>

        <motion.p
          className="mt-3 text-sm text-gray-300 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          “One click closer to your academic freedom.”
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
