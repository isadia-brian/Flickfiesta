"use client";

import React, { useRef } from "react";
import videojs from "video.js";

const Watch = ({ params }: { params: { id: number } }) => {
  const videoId = params.id;

  return (
    <div className=''>
      <iframe
        className='h-[100vh] w-full'
        src={`https://vidsrc.to/embed/movie/${videoId}`}
        title='Iframe Example'
        allow='autoplay'
        allowFullScreen
        referrerPolicy='origin'></iframe>
    </div>
  );
};

export default Watch;
