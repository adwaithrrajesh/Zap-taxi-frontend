import { createContext, useState, ReactNode } from "react";

// Define the shape of the authentication context
interface AuthContextType {
  user: any; // Change 'any' to a proper user type if you have one
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Create context with a default value
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null); // Replace 'any' with a proper user type if available

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
