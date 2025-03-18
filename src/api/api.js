
import axiosInstance from "../components/Authenticate/Axiosinstance";

// Upload video
export const uploadVideo = async (formData) => {
  try {
    const response = await axiosInstance.post(`videos/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
};

// Get all videos
export const getVideos = async () => {
  try {
    const response = await axiosInstance.get(`videos/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos", error);
    throw error;
  }
};
