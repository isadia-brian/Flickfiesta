"use client";

import React, { useRef } from "react";
import videojs from "video.js";

const Watch = ({ params }: { params: { id: number } }) => {
  console.log(params);

  const videoId = params.id;

  // const playerRef = useRef(null);

  // const doubleClickHandler = (event) => {
  //   if (this?.isFullscreen()) {
  //     this?.exitFullscreen();
  //   } else {
  //     this?.requestFullscreen();
  //   }
  // };

  // setting the video-js option for the player
  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: true,
  //   preload: "auto",
  //   playbackRates: [0.5, 1, 1.5, 2],
  //   fluid: true,
  //   controlBar: {
  //     skipButtons: {
  //       forward: 5,
  //       backward: 5,
  //     },
  //   },
  //   userActions: {
  //     doubleClick: doubleClickHandler,
  //     hotKeys: true,
  //   },
  //   sources: [
  //     {
  //       src: "/Oppie.mp4",
  //       type: "video/mp4",
  //     },
  //   ],
  // };

  // const playerReady = (player) => {
  //   playerRef.current = player;

  //   // handling video player
  //   player.on("waiting", () => {
  //     videojs.log("Video Player is waiting");
  //   });
  //   player.on("dispose", () => {
  //     videojs.log("Video player will dispose");
  //   });
  // };

  return (
    <div className=''>
      {/* <Video options={videoJsOptions} onReady={playerReady} /> */}
      <iframe
        className='h-[100vh] w-full'
        src={`https://vidsrc.to/embed/movie/${videoId}`}
        title='Iframe Example'
        allow='autoplay; fullscreen'
        allowFullScreen
        referrerPolicy='origin'></iframe>
    </div>
  );
};

export default Watch;
