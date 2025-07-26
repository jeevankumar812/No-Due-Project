import React from "react";
import { motion } from "framer-motion";

const CollegeImages = () => {
  const images = [
    { src: "/clg1.jpeg", title: "Main Campus", desc: "The heart of our college life" },
    { src: "/clg2.jpeg", title: "Library", desc: "A hub for learning and innovation" },
    { src: "/clg3.jpeg", title: "Sports Complex", desc: "Fitness & fun activities for students" },
  ];

  return (
    <section id="college-images" className="py-16 bg-gray-100">
      {/* ✅ Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Life at Our College
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          A glimpse of our campus, facilities, and vibrant student life.
        </p>
      </div>

      {/* ✅ Image Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* ✅ Image */}
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* ✅ Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white">
              <h3 className="text-lg font-bold">{img.title}</h3>
              <p className="text-sm mt-1">{img.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CollegeImages;
