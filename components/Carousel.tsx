"use client";

import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton } from "./CarouselDots";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  Bookmark,
  Play,
  Heart,
} from "lucide-react";

type MovieProps = {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
};

type PropType = {
  movies: MovieProps[];
};

const Carousel: React.FC<PropType> = (props) => {
  const { movies } = props;

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    AutoPlay({ delay: 6000 }),
  ]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className='embla relative'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {movies.slice(0, 5).map((movie, index) => (
            <div className='embla__slide' key={index}>
              <div className='absolute h-full w-full z-50 flex flex-col gap-7 text-white justify-center ml-28'>
                <h3 className='font-bold text-5xl max-w-[600px]'>
                  {movie.title}
                </h3>
                <p className='text-sm max-w-[600px] line-clamp-4'>
                  {movie.overview}
                </p>
                <div className='flex items-center gap-5'>
                  <Link
                    href={`/watch/`}
                    className='flex items-center justify-center whitespace-nowrap w-[180px] h-9 px-4 rounded-none gap-2 py-6 bg-gradient-to-r from-orange-500 to-red-500 -skew-x-[30deg] text-sm font-medium transition-colors gradient element-to-rotate'>
                    <Play className='h-4 w-4 skew-x-[30deg]' fill='white' />
                    <span className='skew-x-[30deg]'>WATCH NOW</span>
                  </Link>

                  <Button className='flex items-center w-[180px] gap-2 py-6 bg-white/50 backdrop-filter backdrop-blur-sm -skew-x-[30deg] rounded-none text-black hover:bg-black hover:text-white'>
                    <Bookmark
                      className='h-4 w-4 skew-x-[30deg]'
                      strokeWidth={3}
                    />
                    <span className='skew-x-[30deg]'>BOOKMARK</span>
                  </Button>
                </div>
              </div>
              <div className='h-full w-full absolute top-0 left-0  bg-gradient-to-r from-black/70 z-30' />
              <div className='absolute top-0 left-0 h-full w-full z-20'>
                <div className='relative h-full w-full'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    fill
                    alt={movie.title}
                    className='object-cover'
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className='embla__prev text-white absolute top-1/2 left-6 -translate-y-1/2'
        onClick={scrollPrev}
        disabled={prevBtnDisabled}>
        <ChevronLeftCircle className='h-8 w-8 text-slate-500 hover:text-white transition-colors duration-300' />
      </button>
      <button
        className='embla__next text-white absolute top-1/2 right-6 -translate-y-1/2'
        onClick={scrollNext}
        disabled={nextBtnDisabled}>
        <ChevronRightCircle className='h-8 w-8 text-slate-500 hover:text-white transition-colors duration-300' />
      </button>

      <div className='embla__dots'>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={"embla__dot".concat(
              index === selectedIndex
                ? " embla__dot--selected text-red-500"
                : ""
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
