import React from "react";

const CollegeImages = () => {
  const images = [
    "/clg1.jpeg",
    "/clg2.jpeg",
    "/clg3.jpeg",
  ]; // ✅ Put these images in public/

  return (
    <section className="py-16 bg-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Life at Our College
        </h2>
        <p className="text-gray-600 mt-2">
          A glimpse of our campus, facilities, and vibrant student life.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {images.map((img, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={img}
              alt={`college-${i}`}
              className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollegeImages;
