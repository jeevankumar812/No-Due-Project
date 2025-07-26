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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Sticky Header (Logo + Welcome) */}
      <div className="bg-white shadow-md p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="College Logo" className="h-12 w-auto mr-2" />
          <h1 className="text-xl md:text-2xl text-gray-800">
            Alva's Institute of Engineering & Technology
          </h1>
        </div>
        <div className="text-center md:text-right mt-2 md:mt-0">
          <h2 className="text-md md:text-lg text-gray-700">
            Welcome,{" "}
            <span className="text-blue-700">{student?.name}</span> (
            {student?.usn})
          </h2>
          <p className="text-gray-500 text-xs md:text-sm">
            Upload assignments, track approval status & get your certificate.
          </p>
        </div>
      </div>

      {/* ✅ Main Content (Full Width) */}
      <div className="flex-1 p-4 space-y-6">
        {/* Upload Form - Full Width */}
        <div className="bg-white shadow rounded-md p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Upload Assignment
          </h3>
          <form
            onSubmit={handleUpload}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
          >
            <select
              className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
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
              className="border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Upload
            </button>
          </form>
        </div>

        {/* Status Table - Full Width */}
        <div className="bg-white shadow rounded-md p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Assignment Status
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 border text-left">Subject</th>
                  <th className="p-3 border text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub) => {
                  const found = status.find((s) => s.subject === sub);
                  return (
                    <tr key={sub} className="hover:bg-gray-50">
                      <td className="p-3 border">{sub}</td>
                      <td className="p-3 border text-center">
                        {found ? (
                          found.approved ? (
                            <span className="text-green-600 font-medium">
                              ✅ Approved
                            </span>
                          ) : (
                            <span className="text-blue-600 font-medium">
                              📂 Uploaded
                            </span>
                          )
                        ) : (
                          <span className="text-red-600 font-medium">
                            ❌ Not Uploaded
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Bottom Certificate Button - Full Width */}
      <div className="bg-gray-100 p-4 flex justify-center shadow-inner">
        <button
          onClick={handleCertificate}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded shadow transition-all text-lg"
        >
          No Due Certificate
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
