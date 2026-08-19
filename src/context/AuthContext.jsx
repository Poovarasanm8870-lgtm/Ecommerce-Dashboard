import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('luxe_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('luxe_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('luxe_user');
    }
  }, [user]);

  // Demo Login: 'admin@luxe.com' signs in as Admin, any other email signs in as Customer
  const login = (email, password, requestedRole = 'customer') => {
    let role = requestedRole;
    if (email.toLowerCase().includes('admin')) {
      role = 'admin';
    }

    const userData = {
      id: role === 'admin' ? 'admin-001' : 'user-101',
      name: role === 'admin' ? 'Administrator' : email.split('@')[0].replace('.', ' '),
      email,
      role,
      token: 'demo-jwt-token-' + Date.now()
    };

    setUser(userData);
    return userData;
  };

  const register = (name, email, password) => {
    const userData = {
      id: 'user-' + Date.now(),
      name,
      email,
      role: 'customer',
      token: 'demo-jwt-token-' + Date.now()
    };
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
