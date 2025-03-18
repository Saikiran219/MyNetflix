import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import axiosInstance from "./Authenticate/Axiosinstance";
import TrackWatchedProgress from "./TraclWatchedProgress"; // Fixed import name

const WatchedMovies = () => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    axiosInstance.get("movies/watched").then((res) => setMovies(res.data));
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => scroll("left")}>
          <ArrowBackIosIcon sx={{ color: "white" }} />
        </IconButton>
        <Box display="flex" gap={2} overflow="hidden" ref={scrollRef} sx={{ whiteSpace: "nowrap", width: "100%" }}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Box key={movie._id} sx={{ flex: "0 0 auto", width: "300px" }}>
                <TrackWatchedProgress
                  videoUrl={movie.movieId.videoUrl} // Video source
                  movieId={movie.movieId._id} // Movie ID for progress tracking
                  initialProgress={movie.progress} // Pass last watched position
                />
                <Typography color="white">{movie.movieId.title}</Typography>
              </Box>
            ))
          ) : (
            <Typography color="gray">You haven't watched any movies yet.</Typography>
          )}
        </Box>
        <IconButton onClick={() => scroll("right")}>
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </motion.div>
  );
};

export default WatchedMovies;
