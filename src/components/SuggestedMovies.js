import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent,Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "./Authenticate/Axiosinstance";
import TrackWatchedProgress from "./TraclWatchedProgress";

const SuggestedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchSuggestedMovies = async () => {
      try {
        const res = await axiosInstance.get("movies/suggest");
        console.log("Suggested Movies:", res.data); // Debugging
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching suggested movies:", err);
        setMovies([]);
      }
    };
    fetchSuggestedMovies();
  }, []);

  return (
    <Box>
      {movies.length === 0 ? (
        <Typography color="gray">No suggestions available.</Typography>
      ) : (
        <Grid2 container spacing={2}>
          {movies.map((movie, index) => (
            <Grid2 item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <motion.div
                initial={{ opacity: 0, x: 1000 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ bgcolor: "#1e1e1e", color: "white", width: "270px", height: "350px" }}>
                  {/* Video Player with Progress Tracking */}
                  <TrackWatchedProgress videoUrl={movie.videoUrl} movieId={movie._id} progress={movie.progress} />
                  
                  <CardContent>
                    <Typography variant="h6">{movie.title}</Typography>
                    <Typography variant="body2">
                      Languages: {Array.isArray(movie.languages) ? movie.languages.join(", ") : movie.languages}
                    </Typography>
                    <Typography variant="body2">
                      Genres: {Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default SuggestedMovies;
