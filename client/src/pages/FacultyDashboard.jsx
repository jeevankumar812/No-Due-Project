import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const FacultyDashboard = () => {
  const { faculty } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get(
          `/faculty/pending/${faculty.subject}`
        );
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Faculty Dashboard ({faculty?.subject})
      </h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">USN</th>
            <th className="p-2">PDF</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st.usn} className="border">
              <td className="p-2">{st.name}</td>
              <td className="p-2">{st.usn}</td>
              <td className="p-2">
                <a
                  href={`http://localhost:5000/uploads/${st.file}`}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View PDF
                </a>
              </td>
              <td className="p-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => approve(st.usn)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyDashboard;
