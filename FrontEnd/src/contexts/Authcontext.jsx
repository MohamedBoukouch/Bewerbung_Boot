import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { accessApi } from "../services/accessApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const session = await accessApi.getSession();
        if (session?.status === "logged_in") {
          setUser(session.session);
          const gStatus = await accessApi.getGoogleStatus();
          if (gStatus.connected) {
            setGoogleUser({
              email: gStatus.email,
              name: gStatus.name,
              picture: gStatus.picture,
              connected: true,
            });
          }
        }
      } catch (e) {
        console.error("Session init failed", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback((sessionData, googleConnected = false, googleData = null) => {
    setUser(sessionData);
    if (googleConnected && googleData) {
      setGoogleUser({ ...googleData, connected: true });
    }
  }, []);

  const logout = useCallback(async () => {
    await accessApi.logout();
    setUser(null);
    setGoogleUser(null);
  }, []);

  const isFullyAuthenticated = !!user && !!googleUser?.connected;

  const value = {
    user,
    googleUser,
    loading,
    isFullyAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
