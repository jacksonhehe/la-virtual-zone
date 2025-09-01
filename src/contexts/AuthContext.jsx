import React, { createContext, useContext, useState } from 'react';

const SESSION_KEY = 'lvz_session';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const login = (session) => {
    setUser(session);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(SESSION_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
