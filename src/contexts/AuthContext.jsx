try {
  localStorage.clear();
} catch (e) {
  console.warn('Reset localStorage en AuthContext:', e);
}

import React, { createContext, useState, useContext, useEffect } from "react";
import { users as mockUsers } from "../data/mockData";

const AuthContext = createContext({
  user: null,
  login: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (e) {
      console.warn('Error saving user to storage', e);
    }
  }, [user]);

  const login = (email, password) => {
    if (!email) return false;
    const found = (mockUsers || []).find(
      (u) => u && u.email && u.email.toLowerCase() === email.toLowerCase()
    );
    if (found && password === 'password123') {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('user');
    } catch (e) {
      console.warn('Error removing user from storage', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context || { user: null, login: () => false, logout: () => {} };
};
