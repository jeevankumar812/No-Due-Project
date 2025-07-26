import { useState, useContext } from "react";
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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold text-center mb-4">
          {isLogin ? "Student Login" : "Student Register"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border px-3 py-2 rounded"
              required
            />
          )}
          <input
            type="text"
            name="usn"
            value={form.usn}
            onChange={handleChange}
            placeholder="USN"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border px-3 py-2 rounded"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="border px-3 py-2 rounded"
              required
            />
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded mt-2"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p
          className="text-sm text-center mt-3 text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Student;
