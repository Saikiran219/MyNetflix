import { useRef, useEffect, useState } from "react";
import axiosInstance from "./Authenticate/Axiosinstance";

const TrackWatchedProgress = ({ videoUrl, movieId, initialProgress }) => {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video to last watched position when metadata loads
    const handleLoadedMetadata = () => {
      if (initialProgress) {
        video.currentTime = initialProgress;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [initialProgress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sendProgressToBackend = async (progress) => {
      if (!hasStarted) return;
      try {
        await axiosInstance.post("movies/addwatched", {
          movieId,
          progress: Math.floor(progress),
        });
      } catch (err) {
        console.error("Error in sending progress", err);
      }
    };
   
      
    const handleVideoPlay = () => setHasStarted(true);
    const handleVideoPause = () => sendProgressToBackend(video.currentTime);
    const handleVideoEnded = () => sendProgressToBackend(video.duration);
    const handleBeforeUnload = () => sendProgressToBackend(video.currentTime);

    video.addEventListener("play", handleVideoPlay);
    video.addEventListener("pause", handleVideoPause);
    video.addEventListener("ended", handleVideoEnded);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("pause", handleVideoPause);
      video.removeEventListener("ended", handleVideoEnded);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [movieId, hasStarted]);
  
  const handlePausePlay = (event) => {
    const currentVideo = event.target;
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (video !== currentVideo) {
        video.pause();
      }
    });
  };

  return (
    <video ref={videoRef} width="100%" height="200" controls  onPlay={handlePausePlay}>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default TrackWatchedProgress;
