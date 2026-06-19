import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuth } from '../lib/localStore';

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  loading: true,
  signIn: () => false,
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAdmin(adminAuth.isLoggedIn());
    setLoading(false);
  }, []);

  const signIn = (email: string, password: string): boolean => {
    const ok = adminAuth.login(email, password);
    setIsAdmin(ok);
    return ok;
  };

  const signOut = () => {
    adminAuth.logout();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
 