import React, { useState, useEffect } from 'react';
import { Container, Grid2, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axiosInstance from './Authenticate/Axiosinstance';
import { motion } from 'framer-motion';
import TrackWatchedProgress from './TraclWatchedProgress';
const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    fetchVideos();
  }, [language, genre]);

  const fetchVideos = async () => {
    try {
      let res;
      // If no filter is selected, get all movies
      if (!language && !genre) {
        res = await axiosInstance.get('videos/movies');
      } else {
        res = await axiosInstance.get('videos/movies/filter', {
          params: { language, genre }
        });
      }
      setVideos(res.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

 

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212', // Dark background
        color: 'white',
        p: 3,
      }}
    >
      <Container maxWidth="xxlg">
        {/* Filters */}
        <Box display="flex" justifyContent="space-between" mb={3}>
  <FormControl variant="filled" sx={{ minWidth: 300 }}>
    <InputLabel id="language-label" sx={{ color: 'white' }}>Language</InputLabel>
    <Select
      labelId="language-label"
      id="language-select"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      label="Language"
      sx={{
        color: 'white',
        borderColor: 'white',
        '& .MuiSvgIcon-root': { color: 'white' },
      }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="English">English</MenuItem>
      <MenuItem value="Hindi">Hindi</MenuItem>
      <MenuItem value="Telugu">Telugu</MenuItem>
      <MenuItem value="Spanish">Spanish</MenuItem>
    </Select>
  </FormControl>

  <FormControl variant="filled" sx={{ minWidth: 300 }}>
    <InputLabel id="genre-label" sx={{ color: 'white' }}>Genre</InputLabel>
    <Select
      labelId="genre-label"
      id="genre-select"
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      label="Genre"
      sx={{
        color: 'white',
        borderColor: 'white',
        '& .MuiSvgIcon-root': { color: 'white' },
      }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="Action">Action</MenuItem>
      <MenuItem value="Drama">Drama</MenuItem>
      <MenuItem value="Comedy">Comedy</MenuItem>
      <MenuItem value="Romance">Romance</MenuItem>
      <MenuItem value="Thriller">Thriller</MenuItem>
      <MenuItem value="Crime">Crime</MenuItem>
    </Select>
  </FormControl>
</Box>

        {/* Video List */}
        <Grid2 container spacing={3}>
      {videos.map((video,index) => (
        <Grid2 item xs={12} sm={6} md={4} lg={3} key={video._id}>
          <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 ,delay:index*0.1}}
          >
            <Card sx={{ bgcolor: '#1e1e1e', color: 'white',width:'270px' ,height:'350px'}}>
            <TrackWatchedProgress videoUrl={video.videoUrl} movieId={video._id} />
              <CardContent>
                <Typography variant="h5">{video.title}</Typography>
                <Typography variant="body2">
                  Languages: {Array.isArray(video.languages) ? video.languages.join(', ') : video.languages}
                </Typography>
                <Typography variant="body2">
                  Genres: {Array.isArray(video.genres) ? video.genres.join(', ') : video.genres}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid2>
      ))}
    </Grid2>
      </Container>
    </Box>
  );
};

export default VideoList;
