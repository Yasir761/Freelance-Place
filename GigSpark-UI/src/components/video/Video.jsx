import React from "react";

const Video = ({ src, className = "", controls = true }) => {
  return (
    <video
      className={`aspect-video ${className}`}
      controls={controls}
      width={"100%"}
      height="100%"
      autoPlay
      muted
      loop
    >
      <source src={src} type="video/mp4" />
      Sorry, your browser doesn't support embedded videos. 🫠
    </video>
  );
};

export default Video;
