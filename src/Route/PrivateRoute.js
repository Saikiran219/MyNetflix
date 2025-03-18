import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // toast.error("Please login", { position: "top-right" });
    alert("Please login");
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (adminOnly && !decoded.user.isAdmin) {  
      //toast.error("You are not authorized to access this page. Admins only", { position: "top-right" });
      alert("You are not authorized to access this page. Admins only.");
      return <Navigate to="/login" />;
    }
  } catch (error) {
   // toast.error("Invalid token, please login again.", { position: "top-right" });
    alert("Invalid token, please login again.");
    return <Navigate to="/login" />;
  }

  // If no restrictions, render children
  return children;
};

export default PrivateRoute;
