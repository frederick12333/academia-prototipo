import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user && user.role) {
    const isTeacher = typeof user.role === 'string' && user.role.toLowerCase().includes('teacher');
    const dashboardPath = isTeacher ? '/teacher/dashboard' : '/student/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};
