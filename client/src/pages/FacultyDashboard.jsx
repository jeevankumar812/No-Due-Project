import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const FacultyDashboard = () => {
  const { faculty } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get(`/faculty/pending/${faculty.subject}`);
        setStudents(data);
      } catch {
        alert("❌ Failed to fetch students");
      }
    };
    fetchStudents();
  }, [faculty.subject]);

  const approve = async (usn) => {
    try {
      await api.post("/faculty/approve", {
        usn,
        subject: faculty.subject,
      });
      alert("✅ Approved");
      setStudents((prev) => prev.filter((st) => st.usn !== usn));
    } catch {
      alert("❌ Failed to approve");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* ✅ Logo + Title */}
      <div className="flex items-center justify-center mb-6">
        <img src="/logo.png" alt="College Logo" className="h-12 w-auto mr-2" />
        <h1 className="text-xl md:text-2xl text-gray-800">
          Alva's Institute of Engineering & Technology
        </h1>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-lg md:text-xl text-gray-700 font-medium">
          Faculty Dashboard —{" "}
          <span className="text-blue-700 font-semibold">
            {faculty?.subject}
          </span>
        </h2>
        <p className="text-gray-500 text-sm">
          Review and approve student submissions.
        </p>
      </div>

      {/* ✅ Scrollable Table */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-md p-4 overflow-x-auto">
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Pending Approvals
        </h3>
        <table className="w-full border border-gray-200 text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">USN</th>
              <th className="p-2 border">PDF</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((st) => (
                <tr
                  key={st.usn}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-2 border">{st.name}</td>
                  <td className="p-2 border">{st.usn}</td>
                  <td className="p-2 border text-center">
                    <a
                      href={`http://localhost:5000/uploads/${st.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View PDF
                    </a>
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
                      onClick={() => approve(st.usn)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-4 text-gray-500 italic"
                >
                  No pending submissions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyDashboard;
