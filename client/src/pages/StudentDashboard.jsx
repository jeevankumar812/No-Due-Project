import { useState, useContext, useEffect } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const StudentDashboard = () => {
  const { student } = useContext(AuthContext);
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState([]);

  const subjects = [
    "Operating Systems",
    "Database Management System",
    "Computer Networks",
    "Cloud Computing",
    "Machine Learning",
    "Advanced Java",
  ];

  const fetchStatus = async () => {
    try {
      const { data } = await api.get(`/students/${student.usn}`);
      setStatus(data.assignments || []);
    } catch (err) {
      console.error("❌ Failed to fetch status:", err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !subject) return alert("Please select subject & file");

    const formData = new FormData();
    formData.append("usn", student.usn);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const { data } = await api.post("/students/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ " + data.message);
      setFile(null);
      setSubject("");
      document.querySelector('input[type="file"]').value = "";
      fetchStatus(); // ✅ refresh immediately
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Upload failed"));
    }
  };

  const handleCertificate = async () => {
    try {
      const { data } = await api.post("/students/certificate", {
        usn: student.usn,
      });
      alert("✅ " + data.message);
      if (data.pdf) {
        window.open(`http://localhost:5000/${data.pdf}`, "_blank");
      }
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Certificate failed"));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Welcome {student?.name} ({student?.usn})
      </h2>

      {/* ✅ Upload Form */}
      <form onSubmit={handleUpload} className="flex gap-4 mb-4">
        <select
          className="border px-3 py-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {/* ✅ Status Table */}
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((sub) => {
            const found = status.find((s) => s.subject === sub);
            return (
              <tr key={sub}>
                <td className="p-2 border">{sub}</td>
                <td className="p-2 border">
                  {found
                    ? found.approved
                      ? "✅ Approved"
                      : "📂 Uploaded"
                    : "❌ Not Uploaded"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={handleCertificate}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Generate / Download No Due Certificate
      </button>
    </div>
  );
};

export default StudentDashboard;
