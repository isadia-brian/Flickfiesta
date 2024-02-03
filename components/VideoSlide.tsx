"use client";

import { useState } from "react";
import YouTube from "react-youtube";
const VideoSlide = (props) => {
  const { id } = props;

  const opts = {
    height: "200",
    width: "290",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const [videos, setVideos] = useState(id);

  return <YouTube opts={opts} videoId={id} />;
};

export default VideoSlide;
