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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Sticky Header (Logo + Title) */}
      <div className="bg-white shadow-md p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="College Logo" className="h-12 w-auto mr-2" />
          <h1 className="text-xl md:text-2xl text-gray-800">
            Alva's Institute of Engineering & Technology
          </h1>
        </div>
        <div className="text-center md:text-right mt-2 md:mt-0">
          <h2 className="text-md md:text-lg text-gray-700 font-medium">
            Faculty Dashboard —{" "}
            <span className="text-blue-700 font-semibold">
              {faculty?.subject}
            </span>
          </h2>
          <p className="text-gray-500 text-xs md:text-sm">
            Review and approve student submissions.
          </p>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 p-4 space-y-6">
        <div className="bg-white shadow rounded-md p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Pending Approvals
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 border text-left">Name</th>
                  <th className="p-3 border text-left">USN</th>
                  <th className="p-3 border text-center">PDF</th>
                  <th className="p-3 border text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((st) => (
                    <tr key={st.usn} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 border">{st.name}</td>
                      <td className="p-3 border">{st.usn}</td>
                      <td className="p-3 border text-center">
                        <a
                          href={`http://localhost:5000/uploads/${st.file}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          View PDF
                        </a>
                      </td>
                      <td className="p-3 border text-center">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow"
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
      </div>

      {/* ✅ Bottom Footer */}
      <div className="bg-gray-100 p-4 text-center text-gray-500 text-sm shadow-inner">
        © {new Date().getFullYear()} Alva's Institute of Engineering & Technology
      </div>
    </div>
  );
};

export default FacultyDashboard;
