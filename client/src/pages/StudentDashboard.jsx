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
      fetchStatus();
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
    <div className="h-screen flex flex-col justify-between bg-gray-50 p-4 md:p-6">
      {/* ✅ Logo + Welcome */}
      <div>
        <div className="flex items-center justify-center mb-3">
          <img src="/logo.png" alt="College Logo" className="h-12 w-auto mr-2" />
          <h1 className="text-xl md:text-2xl text-gray-800">
            Alva's Institute of Engineering & Technology
          </h1>
        </div>
        <div className="text-center mb-4">
          <h2 className="text-lg md:text-xl text-gray-700">
            Welcome,{" "}
            <span className="text-blue-700">{student?.name}</span> (
            {student?.usn})
          </h2>
          <p className="text-gray-500 text-xs md:text-sm">
            Upload assignments, track approval status, and download your No Due Certificate.
          </p>
        </div>
      </div>

      {/* ✅ Middle Content (Upload + Table) */}
      <div className="flex-1 flex flex-col justify-center items-center gap-4">
        {/* Upload Form */}
        <div className="w-full max-w-3xl bg-white shadow rounded-md p-4">
          <h3 className="text-md font-medium text-gray-700 mb-3">
            Upload Assignment
          </h3>
          <form
            onSubmit={handleUpload}
            className="flex flex-col md:flex-row gap-3"
          >
            <select
              className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
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
              className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto "
            >
              Upload
            </button>
          </form>
        </div>

        {/* Status Table */}
        <div className="w-full max-w-3xl bg-white shadow rounded-md p-4">
          <h3 className="text-md font-medium text-gray-700 mb-3">
            Assignment Status
          </h3>
          <table className="w-full border border-gray-200 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => {
                const found = status.find((s) => s.subject === sub);
                return (
                  <tr key={sub} className="hover:bg-gray-50">
                    <td className="p-2 border">{sub}</td>
                    <td className="p-2 border text-center">
                      {found ? (
                        found.approved ? (
                          <span className="text-green-600">✅ Approved</span>
                        ) : (
                          <span className="text-blue-600">📂 Uploaded</span>
                        )
                      ) : (
                        <span className="text-red-600">❌ Not Uploaded</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Certificate Button */}
      <div className="flex justify-center pb-2">
        <button
          onClick={handleCertificate}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-1 rounded shadow transition-all"
        >
        No Due Certificate
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
