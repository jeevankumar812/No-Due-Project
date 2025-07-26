import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [faculty, setFaculty] = useState(null);

  return (
    <AuthContext.Provider value={{ student, setStudent, faculty, setFaculty }}>
      {children}
    </AuthContext.Provider>
  );
};
