import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Faculty = () => {
  const { setFaculty } = useContext(AuthContext);
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation for demo
    if (password === "1234") {
      setFaculty({ subject });
      navigate("/faculty/dashboard");
    } else {
      alert("❌ Wrong password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold text-center mb-4">Faculty Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            className="border px-3 py-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select Subject</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>ComputerScience</option>
            <option>English</option>
            <option>Electronics</option>
          </select>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Faculty;
