import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
    const { isAuth } = useSelector((state) => state.admin);
   if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectRoute;