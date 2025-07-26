import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Faculty = () => {
  const { setFaculty } = useContext(AuthContext);
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (password === "1234") {
        setFaculty({ subject });
        navigate("/faculty/dashboard");
      } else {
        setError("Invalid credentials. Please verify your password.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/g1.jpg')" }}
    >
      {/* Neutral Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>


      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40V0h-1v40h1zM39 1v1H0V1h39z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Left Content */}
      <motion.div
        className="absolute left-0 top-0 h-full flex items-center z-10 px-12 lg:px-20 max-w-2xl"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-white">
          {/* Headline */}
          <motion.h1
            className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Excellence in
            <br />
            <span className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
              Academic Management
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl text-gray-200 leading-relaxed mb-8 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Streamline your academic workflow with our comprehensive faculty
            management system. Review submissions, track progress, and manage
            approvals with unprecedented efficiency.
          </motion.p>

          {/* Feature List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { icon: "📊", text: "Real-time Analytics & Monitoring" },
              { icon: "⚡", text: "Instant Document Review & Approval" },
              { icon: "🔒", text: "Secure Document Management System" },
              { icon: "📱", text: "Multi-device Accessibility" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 border border-white/20">
                  <span className="text-lg">{feature.icon}</span>
                </div>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Login Card */}
      <motion.div
        className="absolute right-10 top-1/2 transform -translate-y-1/2 z-10 
                   bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-96 
                   border border-white/20"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center shadow-lg">
              <img
                src="/logo.png"
                alt="Institution Logo"
                className="h-10 w-auto"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Faculty Access Portal
          </h2>
          <p className="text-slate-600 text-sm">
            Secure authentication for authorized personnel
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Academic Department
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-slate-500 focus:border-slate-500 
                         text-slate-700 font-medium transition-all duration-200
                         appearance-none cursor-pointer"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Select Your Subject</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Database Management System">
                  Database Management System
                </option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Advanced Java">Advanced Java Programming</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Access Credentials
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your secure password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-slate-500 focus:border-slate-500 
                         text-slate-700 font-medium transition-all duration-200"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-3">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-700 hover:bg-slate-800 
                     text-white py-3 rounded-lg font-semibold text-base
                     shadow-lg hover:shadow-xl transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Authenticating...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>Access Portal</span>
              </div>
            )}
          </motion.button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs text-center text-slate-500">
            Experiencing access issues? Contact{" "}
            <span className="text-slate-600 font-medium cursor-pointer hover:underline">
              Technical Support
            </span>
          </p>
        </div>
      </motion.div>

      {/* Bottom Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-xs font-medium tracking-widest">
          SECURE • EFFICIENT • RELIABLE
        </p>
      </motion.div>
    </section>
  );
};

export default Faculty;
