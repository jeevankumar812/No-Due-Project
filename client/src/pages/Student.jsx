import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const Student = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    usn: "",
    password: "",
    confirmPassword: "",
  });

  const { setStudent } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await api.post("/students/login", {
          usn: form.usn,
          password: form.password,
        });
        setStudent(data);
        alert("✅ Login Successful!");
        navigate("/student/dashboard");
      } else {
        if (form.password !== form.confirmPassword) {
          alert("❌ Passwords do not match!");
          return;
        }
        await api.post("/students/register", {
          name: form.name,
          usn: form.usn,
          password: form.password,
        });
        alert("✅ Registered successfully! Please login now.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/reg.png')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✅ Left Inspirational Text */}
      <div className="absolute top-24 left-10 z-10 text-white max-w-lg animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Welcome to <span className="text-blue-400">No Due Portal</span>
        </h1>
        <p className="text-lg md:text-xl font-medium mt-4 text-gray-200">
          Your journey to a <strong>paperless academic process</strong> starts here!
        </p>
        <ul className="mt-4 space-y-2 text-gray-300">
          <li>✅ Upload assignments for all subjects</li>
          <li>✅ Track approval status in real-time</li>
          <li>✅ Download your No Due Certificate instantly</li>
        </ul>
      </div>

      {/* ✅ Right Login/Register Card */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 w-full max-w-sm text-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png"
            alt="College Logo"
            className="h-20 w-auto drop-shadow-lg"
          />
        </div>

        {/* Tab Switch */}
        <div className="flex justify-center gap-6 mb-4">
          <button
            className={`text-lg font-semibold ${
              isLogin
                ? "text-blue-300 border-b-2 border-blue-300"
                : "text-gray-400 hover:text-blue-200"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-lg font-semibold ${
              !isLogin
                ? "text-green-300 border-b-2 border-green-300"
                : "text-gray-400 hover:text-green-200"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="bg-white/20 placeholder-gray-200 text-white border border-white/30 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          )}
          <input
            type="text"
            name="usn"
            value={form.usn}
            onChange={handleChange}
            placeholder="USN"
            className="bg-white/20 placeholder-gray-200 text-white border border-white/30 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-white/20 placeholder-gray-200 text-white border border-white/30 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="bg-white/20 placeholder-gray-200 text-white border border-white/30 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          )}

          <button
            type="submit"
            className={`${
              isLogin
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-2 rounded mt-2 transition duration-300`}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Switch Message */}
        <p
          className="text-sm text-center mt-3 text-blue-400 hover:text-blue-300 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register here"
            : "Already have an account? Login"}
        </p>
      </div>

      {/* ✅ Bottom Information Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-gray-300 text-center py-3 text-sm">
        © {new Date().getFullYear()} Alva’s Engineering College | Designed for
        a Paperless Academic Future ✨
      </div>
    </section>
  );
};

export default Student;
