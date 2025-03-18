import React, { useState } from "react";
import { Box, Container, Grid2, Card, CardContent, Typography, } from "@mui/material";
import SearchMovies from "../components/SearhMovie";
import WatchedMovies from "../components/watchedMovies";
import SuggestedMovies from "../components/SuggestedMovies";
import TrackWatchedProgress from "../components/TraclWatchedProgress"
import VideoList from "../components/vidoList";
import { motion } from "framer-motion";
import HeaderButtons from "../components/HeaderButton";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Box sx={{ backgroundColor: "black", minHeight: "100vh", py: 4 }}>
    <Container maxWidth="xxlg" sx={{ mt: 4 }}>
    <ToastContainer position="top-center" autoClose={3000} />
      <HeaderButtons/>
    {/* Search and Filter Section */}
    <Box sx={{ position: "absolute", top: 20, right: 20, width: "400px" }}>
      <SearchMovies setSearchResults={setSearchResults} />
    </Box>
    {searchResults.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" sx={{ mt: 3, color: "white"  }}>
            Search Results
          </Typography>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            {searchResults.map((video, index) => (
              <Grid2 item xs={12} sm={6} md={4} lg={3} key={video._id}>
                <motion.div
                  initial={{ opacity: 0, x: 1000 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ bgcolor: "#1e1e1e", color: "white", width: "270px", height: "350px" }}>
                  <TrackWatchedProgress videoUrl={video.videoUrl} movieId={video._id} />
                    <CardContent>
                      <Typography variant="h6">{video.title}</Typography>
                      <Typography variant="body2">
                        Languages: {Array.isArray(video.languages) ? video.languages.join(", ") : video.languages}
                      </Typography>
                      <Typography variant="body2">
                        Genres: {Array.isArray(video.genres) ? video.genres.join(", ") : video.genres}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid2>
            ))}
          </Grid2>
        </motion.div>
      ) : (<>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  textAlign: "center",
                  py: 1,
                  mt: 18,
                  width: "100%",
                  mb: 2,
                }}
              >
                Watched Movies
              </Typography>
              <WatchedMovies />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  textAlign: "center",
                  py: 1,
                  width: "100%",
                  mb: 2,
                  mt: 18,
                }}
              >
                Suggested Movies
              </Typography>
              <SuggestedMovies />
            </motion.div>
              
              {/* All Movies Section */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  textAlign: "center",
                  py: 1,
                  width: "100%",
                  mb: 2,
                  mt: 18,
                }}
              >
                All Movies
              </Typography>
              <VideoList />
            </motion.div>
          </>)}
 
    
   
  </Container>
  </Box>
);
};

export default Home;
