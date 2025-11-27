'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn, signUp, signOut, getCurrentUser } from '@/lib/cognito';
import { api } from '@/lib/api';

interface User {
  email: string;
  user_id: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const { data } = await api.get('/users/profile');
        setUser(data);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const token = await signIn(email, password);
    localStorage.setItem('token', token);
    const { data } = await api.get('/users/profile');
    setUser(data);
  };

  const register = async (email: string, password: string) => {
    await signUp(email, password);
    await login(email, password);
  };

  const logout = () => {
    signOut();
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
