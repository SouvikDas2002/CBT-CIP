import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtecRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtecRoute;
