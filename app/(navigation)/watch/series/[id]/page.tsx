"use client";

import React, { useRef } from "react";
import videojs from "video.js";

const Watch = ({ params }: { params: { id: number } }) => {
  const videoId = params.id;

  return (
    <div className='mt-24'>
      <iframe
        className='h-[100vh] w-full'
        src={`https://vidsrc.to/embed/tv/${videoId}?autoplay=1&muted=1`}
        title='Iframe Example'
        allow='autoplay; fullscreen'
        allowFullScreen
        referrerPolicy='origin'></iframe>
    </div>
  );
};

export default Watch;
