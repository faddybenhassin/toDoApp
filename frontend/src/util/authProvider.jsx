import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyToken() {
      const savedToken = localStorage.getItem('token');
      
      if (savedToken) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${savedToken}` }
          });

          if (response.ok) {
            setToken(savedToken);
          } else {
            // Server rejected the token (likely expired)
            logout();
          }
        } catch (error) {
          logout(); // Network error or server down
        }
      }
      setLoading(false);
    }

    verifyToken();
  }, []);

  function login(newToken) {
    if (!newToken) return;
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  function isAuthenticated() {
    return !!token;
  }

  const value = {
    token,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}