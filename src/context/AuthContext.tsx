"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => void;
  loginWithToken: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const queryClient = useQueryClient();

  const storeAuth = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    queryClient.clear();
    storeAuth(data.token, data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    queryClient.clear();
    storeAuth(data.token, data.user);
  };

  const demoLogin = async () => {
    const { data } = await api.post('/auth/demo-login');
    queryClient.clear();
    storeAuth(data.token, data.user);
  };

  const logout = () => {
    queryClient.clear();
    clearAuth();
  };

  const loginWithToken = async (token: string) => {
    queryClient.clear();
    localStorage.setItem('token', token);
    try {
      const res = await api.get('/auth/me');
      const user: User = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      throw err;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((res) => {
        const user: User = res.data;
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(() => {
        clearAuth();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, login, register, demoLogin, logout, loginWithToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
