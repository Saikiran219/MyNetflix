import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import netflixLogo from "../assets/download.png"; // Ensure the path is correct
import netflixbackground from "../assets/198b2f01e73b905772279616eccc7c65.jpg"
import axios from 'axios';
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/users/login', credentials);
      console.log("API Response:", res.data); // Check the response structure
      localStorage.setItem('token', res.data.accessToken);
      navigate('/home'); 
    } catch (err) {
       toast.error("Invalid email or password! Please try again.", { position: "top-right" });
     
    }
  };
  

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Animation */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1], 
          x: ["0%", "2%", "0%"],
          y: ["0%", "-2%", "0%"]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `url(${netflixbackground}) no-repeat center center`,
          backgroundSize: 'cover',
          zIndex: -1
        }}
      />
      {/* Background Overlay for Better Visibility */}
      <Box sx={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }} />
     <motion.div
        initial={{ opacity: 0, rotateX: 180, scale: 0.5 }}
        animate={{ opacity: 1, rotateX: 0, scale: 1, rotateY: 10 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      >
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: 'rgba(20,20,20,0.85)',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          zIndex: 2, // Ensures it's above the overlay
        }}
      >
        
         <ToastContainer /> 
        {/* Netflix Logo */}
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={netflixLogo} alt="Netflix" width={90} />
        </Box>

        <Typography variant="h4" color="white" align="center" gutterBottom>
          Sign In
        </Typography>

      

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            margin="normal"
            InputProps={{ sx: { bgcolor: '#333', color: 'white' } }}
            InputLabelProps={{ sx: { color: 'lightgray' } }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="filled"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
            InputProps={{ sx: { bgcolor: '#333', color: 'white' } }}
            InputLabelProps={{ sx: { color: 'lightgray' } }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, bgcolor: '#E50914', ':hover': { bgcolor: '#B2070F' } }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" color="white" align="center" sx={{ mt: 2 }}>
          Not signed up?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'lightblue' }}
          >
            Register
          </span>
        </Typography>
      </Container>
      </motion.div>
    </Box>
  );
};

export default Login;
