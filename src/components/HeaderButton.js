import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { jwtDecode } from 'jwt-decode';

const HeaderButtons = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Decode token to check if the user is an admin
  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.user.isAdmin;
    } catch (err) {
      console.error("Invalid Token:", err);
    }
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        display: "flex",
        gap: 2,
      }}
    >
      {/* Logout Button (Top Left) */}
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ fontWeight: "bold" }}
      >
        Logout
      </Button>

      {/* Upload Button (Top Right) - Only for Admins */}
      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/upload")}
          sx={{ position: "absolute", right: -150, fontWeight: "bold" }}
        >
          Upload Video
        </Button>
      )}
    </Box>
  );
};

export default HeaderButtons;
