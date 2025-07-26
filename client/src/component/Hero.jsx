import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/bii.jpg')", // ✅ Ensure image is in public folder
      }}
    >
      {/* ✅ Light, Natural Overlay (no blue tint) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✅ Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* ✅ Premium Logo Placement */}
      <div className="absolute top-8 right-10 z-20">
        <motion.img
          src="/logo.png"
          alt="Institution Logo"
          className="h-20 w-auto filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
      </div>

      {/* ✅ Main Content */}
      <div className="relative z-10 max-w-4xl px-8 md:px-16 lg:px-24">
        {/* Headline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-200 text-sm font-medium tracking-wide">
              PAPERLESS CLEARANCE
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Revolutionize Your
            <br />
            <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-pink-300 
                bg-clip-text text-transparent drop-shadow-md">No - Due Journey</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed font-light mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Upload assignments, get approvals, and download your
          <strong className="text-white font-medium"> No Due Certificate</strong> — 
          all in one place, <span className="text-white">100% paperless</span>.
        </motion.p>

        {/* ✅ Previous Quote (Restored, Elegant Style) */}
        <motion.p
          className="text-sm text-gray-300 italic mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          “One click closer to your academic freedom.”
        </motion.p>

        {/* ✅ CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <Link to="college-images" smooth={true} duration={800}>
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 
                             text-white font-semibold rounded-lg shadow-2xl 
                             hover:from-blue-700 hover:to-blue-800 
                             transform hover:scale-105 transition-all duration-300
                             border border-blue-500/50"
            >
              <span className="relative z-10 flex items-center">
                Explore More ↓
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 
                            rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* ✅ Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs font-medium tracking-widest mb-2">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
