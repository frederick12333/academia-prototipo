import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role) {
    const userRole = String(user.role).toLowerCase();
    const targetRole = String(requiredRole).toLowerCase();
    if (!userRole.includes(targetRole)) {
      const fallback = userRole.includes('teacher') ? '/teacher/dashboard' : '/student/dashboard';
      return <Navigate to={fallback} replace />;
    }
  }

  return children;
};
