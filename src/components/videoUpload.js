import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { uploadVideo } from "../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import netflixbackground from "../assets/register.jpg";

const VideoUpload = ({ onUploadSuccess }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [languages, setLanguages] = useState("");
  const [genres, setGenres] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleLanguagesChange = (e) => setLanguages(e.target.value);
  const handleGenresChange = (e) => setGenres(e.target.value);

  const handleUpload = async () => {
    if (!file || !title || !languages || !genres) {
      toast.error("Please fill all fields!", { position: "top-right" });
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("languages", JSON.stringify(languages.split(",")));
    formData.append("genres", JSON.stringify(genres.split(",")));

    setLoading(true);
    try {
      const response = await uploadVideo(formData); 
      if (response.success) {
        toast.success("Video uploaded successfully!", {
          position: "top-right",
          onClose: () => navigate("/home"), // Redirect after toast closes
        });}
     } catch (error) {
      toast.error("Upload failed! Please try again.", { position: "top-right" });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // Netflix-inspired dark background with overlay
        background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(53, 3, 3, 0.8)), url(${netflixbackground}) no-repeat center center`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // Card aligned to the left
        p: 2,
      }}
    >
      <Container maxWidth="sm">
      <ToastContainer /> 
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: "rgba(20,20,20,0.9)",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Upload Video
              </Typography>
              <Box component="form" noValidate sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Title"
                  value={title}
                  onChange={handleTitleChange}
                  sx={{
                    mb: 2,
                    backgroundColor: "#333",
                    input: { color: "#fff" },
                    label: { color: "#bbb" },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Languages (comma-separated)"
                  value={languages}
                  onChange={handleLanguagesChange}
                  sx={{
                    mb: 2,
                    backgroundColor: "#333",
                    input: { color: "#fff" },
                    label: { color: "#bbb" },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  label="Genres (comma-separated)"
                  value={genres}
                  onChange={handleGenresChange}
                  sx={{
                    mb: 2,
                    backgroundColor: "#333",
                    input: { color: "#fff" },
                    label: { color: "#bbb" },
                  }}
                />
                <Box sx={{ mb: 2 }}>
                  <label htmlFor="video-upload">
                    <input
                      style={{ display: "none" }}
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      sx={{ backgroundColor: "#E50914" }}
                    >
                      {file ? "Change Video" : "Choose Video"}
                    </Button>
                  </label>
                  {file && (
                    <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
                      {file.name}
                    </Typography>
                  )}
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleUpload}
                  disabled={loading}
                  sx={{
                    backgroundColor: "#E50914",
                    color: "#fff", // Ensures text remains visible
                    py: 1.5,
                    fontWeight: "bold",
                    "&:disabled": {
                      backgroundColor: "#E50914", // Keeps background color the same when disabled
                      opacity: 0.7, // Slight transparency to indicate loading state
                    },
                  }}
                  >
                  {loading ? "Uploading..." : "Upload"}
              </Button>

              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default VideoUpload;
