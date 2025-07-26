import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center text-white"
      style={{
        backgroundImage: "url('/bii.jpg')", // ✅ Ensure this image is in public/
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Left-aligned Animated Content */}
      <div className="relative z-10 max-w-xl text-left px-6 md:px-16 lg:px-24">
        <motion.p
          className="bg-blue-600/70 px-3 py-1 rounded-full text-sm inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Paperless Clearance System
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Are you tired of manual <br /> No Due clearance?
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Upload assignments, get approvals, and download your No Due certificate — all in one place.
        </motion.p>

        <motion.button
          className="mt-6 px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg 
                     hover:bg-blue-700 hover:text-white transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
        >
          Explore More →
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
