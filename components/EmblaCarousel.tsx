"use client";

import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);
  return (
    <div className='embla mt-24' ref={emblaRef}>
      <div className='flex text-black'>
        <div className='w-[800px] bg-black mr-10'>
          <p>Slide 1</p>
        </div>
        <div className='w-[500px] bg-black mr-10'>
          <p>Slide 2</p>
        </div>
        <div className='w-[500px] bg-black mr-10'>
          <p>Slide 3</p>
        </div>
        <div className='w-[500px] bg-black mr-10'>
          <p>Slide 3</p>
        </div>
        <div className='w-[500px] bg-black mr-10'>
          <p>Slide 3</p>
        </div>
        <div className='w-[500px]'>
          <p>Slide 3</p>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
