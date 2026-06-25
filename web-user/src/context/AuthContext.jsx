import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // TODO: replace with real login logic
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    role: "official", // can be "staff", "official", "faculty"
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}