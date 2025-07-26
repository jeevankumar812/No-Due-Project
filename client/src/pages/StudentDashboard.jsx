import { useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const StudentDashboard = () => {
  const { student } = useContext(AuthContext);
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "ComputerScience",
    "English",
    "Electronics",
  ];

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !subject) return alert("Please select subject & file");

    const formData = new FormData();
    formData.append("usn", student.usn);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const { data } = await api.post("/students/upload", formData);
      alert("✅ " + data.message);
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
      <button
        onClick={handleCertificate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Generate No Due Certificate
      </button>
    </div>
  );
};

export default StudentDashboard;
