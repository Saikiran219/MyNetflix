import React, { useState } from "react";
import axiosInstance from "./Authenticate/Axiosinstance";
import { TextField, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const SearchMovies = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

  const HandleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await axiosInstance.get(`movies/search?query=${query}`);
      if (res.data.length === 0) {
        toast.error("No movies found for this search!");
      }

      setSearchResults(res.data);
    } catch (err) {
      toast.error("Error fetching search results.");
      setSearchResults([]);
    }
  };

  // Trigger search on "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission behavior
      HandleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ width: "100%", maxWidth: "600px", mx: "auto",mt:6 }} // Wider search bar
      >
        <TextField
          variant="outlined"
          placeholder="Search Movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
          fullWidth
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": { fontSize: "1.2rem" }, // Bigger text
          }}
        />
        <IconButton onClick={HandleSearch} color="primary">
          <SearchIcon />
        </IconButton>
      </Box>
    </motion.div>
  );
};

export default SearchMovies;
