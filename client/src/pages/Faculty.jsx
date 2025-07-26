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
      style={{ backgroundImage: "url('/g1.jpg')" }} // ✅ Ensure image in public
    >
      {/* ✅ Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* ✅ Faculty Info (Left Bottom) */}
      <motion.div
        className="absolute bottom-24 left-10 z-10 text-white max-w-md"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-3xl md:text-5xl font-bold tracking-wide">
          Empowering Education —
        </p>
        <p className="text-lg md:text-xl text-gray-200 mt-3 leading-relaxed">
          Faculty members can review, approve, and monitor student submissions
          in real-time. Stay organized with our paperless clearance system.
        </p>

        {/* ✅ Key Points for Faculty */}
        <ul className="mt-4 space-y-2 text-gray-300 text-sm md:text-base">
          <li>✅ Quick approval process</li>
          <li>✅ Access student submissions anytime</li>
          <li>✅ Download reports in one click</li>
        </ul>
      </motion.div>

      {/* ✅ Login Card (Bottom Right, Animated) */}
      <motion.div
        className="absolute bottom-10 right-10 z-10 bg-white shadow-2xl rounded-xl p-6 w-80"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
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

        <h2 className="text-xl font-semibold text-center mb-1 text-gray-800">
          Faculty Login
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Secure access for authorized faculty members only
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            className="border border-gray-300 px-3 py-2 rounded-md 
                       focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select Subject</option>
            <option>Operating Systems</option>
            <option>Database Management System</option>
            <option>Computer Networks</option>
            <option>Cloud Computing</option>
            <option>Machine Learning</option>
            <option>Advanced Java</option>
          </select>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 px-3 py-2 rounded-md 
                       focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
          />

          <motion.button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mt-2 
                       shadow-md hover:shadow-lg transition-all font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* ✅ Small Note Below */}
        <p className="text-xs text-center text-gray-500 mt-3">
          Need help? Contact the admin office.
        </p>
      </motion.div>
    </section>
  );
};

export default Faculty;
