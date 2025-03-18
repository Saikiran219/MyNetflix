import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import netflixLogo from "../assets/download.png";
import netflixbackground from "../assets/register.jpg";
import axios from 'axios';
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [formDetails, setFormDetails] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });

        // Clear errors when user types
        setErrors({ ...errors, [name]: "" });
    };

  
    const validateForm = () => {
        let newErrors = {};

        if (!formDetails.username.trim()) newErrors.username = "Username is required";
        if (!formDetails.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDetails.email)) {
            newErrors.email = "Enter a valid email address";
        }
        if (!formDetails.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formDetails.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        if (!formDetails.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop if validation fails

        try {
            const res = await axios.post('http://localhost:5001/api/users/Register', formDetails);
            toast.success("User Registered successfully!", {
                position: "top-right",
                onClose: () => navigate("/login"), // Redirect after toast closes
            });
        } catch (err) {
            toast.error("Register failed! Please try again.", { position: "top-right" });
        }
    };

    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `url(${netflixbackground}) no-repeat center center`,
                    backgroundSize: 'cover',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                />
                <motion.div
                    initial={{ opacity: 0, rotateZ: 180, scale: 0.5 }}
                    animate={{ opacity: 1, rotateZ: 0, scale: 1,  }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ transformOrigin: "center" }}
                >

                <Container
                    maxWidth="xs"
                    sx={{
                        bgcolor: 'rgba(20,20,20,0.85)',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        zIndex: 2,
                    }}
                >
                    <ToastContainer />
                    <Box display="flex" justifyContent="center" mb={2}>
                        <img src={netflixLogo} alt="Netflix" width={90} />
                    </Box>

                    <Typography variant="h4" color="white" align="center" gutterBottom>
                        Register
                    </Typography>

                    <form onSubmit={handleSubmit} autocomplete="off">
                        {/* Username Field */}
                        <TextField
                            fullWidth
                            label="Email"
                            variant="filled"
                            name="email"
                            value={formDetails.email}
                            onChange={handleChange}
                            margin="normal"
                            error={errors.email}
                            helperText={errors.email}
                            InputProps={{ sx: { bgcolor: '#333', color: 'white' } }}
                            InputLabelProps={{ sx: { color: 'lightgray' } }}
                        />

                        {/* Email Field */}
                        <TextField
                            fullWidth
                            label="UserName"
                            variant="filled"
                            name="username"
                            value={formDetails.username}
                            onChange={handleChange}
                            margin="normal"
                            error={errors.username}
                            helperText={errors.username}
                             autoComplete="new-username"
                            InputProps={{ sx: { bgcolor: '#333', color: 'white' } }}
                            InputLabelProps={{ sx: { color: 'lightgray' } }}
                        />

                        {/* Password Field */}
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="filled"
                            name="password"
                            value={formDetails.password}
                            onChange={handleChange}
                            margin="normal"
                            error={errors.password}
                            helperText={errors.password}
                            InputProps={{ sx: { bgcolor: '#333', color: 'white' } }}
                            InputLabelProps={{ sx: { color: 'lightgray' } }}
                        />

                        {/* Phone Number Field */}
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="filled"
                            name="phoneNumber"
                            value={formDetails.phoneNumber}
                            onChange={handleChange}
                            margin="normal"
                            error={errors.phoneNumber}
                            helperText={errors.phoneNumber}
                            InputProps={{ sx: { bgcolor: '#333', color: 'white' } }}
                            InputLabelProps={{ sx: { color: 'lightgray' } }}
                        />

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2, bgcolor: '#E50914', ':hover': { bgcolor: '#B2070F' } }}
                        >
                            Register
                        </Button>
                    </form>
                </Container>
                </motion.div>
            </Box>
        </>
    );
};

export default Register;
