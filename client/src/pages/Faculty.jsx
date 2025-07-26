import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Faculty = () => {
  const { setFaculty } = useContext(AuthContext);
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "1234") {
      setFaculty({ subject });
      navigate("/faculty/dashboard");
    } else {
      alert("❌ Wrong password");
    }
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/g1.jpg')" }} // ✅ Ensure image exists in public
    >
      {/* ✅ Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* ✅ Left Text Content */}
      <motion.div
        className="absolute bottom-28 left-10 z-10 text-white max-w-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-3xl md:text-5xl font-extrabold tracking-wide leading-snug">
          Empowering Faculty Excellence
        </p>
        <p className="text-lg md:text-xl text-gray-200 mt-3 leading-relaxed">
          Manage, review, and approve student submissions efficiently — all in
          one place with our paperless clearance system.
        </p>

        <ul className="mt-4 space-y-2 text-gray-300 text-sm md:text-base">
          <li>✅ Real-time approval & monitoring</li>
          <li>✅ Instant access to student submissions</li>
          <li>✅ Organized & secured document management</li>
        </ul>
      </motion.div>

      {/* ✅ Login Card */}
      <motion.div
        className="absolute bottom-10 right-10 z-10 bg-white shadow-xl rounded-xl p-6 w-80 md:w-96 border border-gray-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
      >
        {/* ✅ Logo */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <img src="/logo.png" alt="College Logo" className="h-14 w-auto" />
        </motion.div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Faculty Login
        </h2>
        <p className="text-center text-sm text-gray-500 mb-5">
          Secure access for authorized faculty only
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Subject Dropdown */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Select Subject</label>
            <select
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 
                         focus:ring-blue-500 text-gray-700 w-full"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">-- Choose Subject --</option>
              <option>Operating Systems</option>
              <option>Database Management System</option>
              <option>Computer Networks</option>
              <option>Cloud Computing</option>
              <option>Machine Learning</option>
              <option>Advanced Java</option>
            </select>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 
                         focus:ring-blue-500 text-gray-700 w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md 
                       mt-2 shadow-md hover:shadow-lg transition-all font-medium text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* ✅ Small Note */}
        <p className="text-xs text-center text-gray-500 mt-4">
          For any issues, contact the admin office.
        </p>
      </motion.div>
    </section>
  );
};

export default Faculty;
