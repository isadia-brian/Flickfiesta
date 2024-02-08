"use client";

import React, { useState, useRef } from "react";

import {
  TrendingUp,
  Star,
  Heart,
  Eye,
  Flame,
  AlignHorizontalJustifyStart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const headerButtons = [
  {
    title: "Trending",
    link: "",
    icon: <TrendingUp className='h-4 w-4' />,
  },
  {
    title: "Watching",
    link: "",
    icon: <AlignHorizontalJustifyStart className='h-4 w-4' />,
  },
  {
    title: "Popular",
    link: "",
    icon: <Flame className='h-4 w-4' />,
  },
  {
    title: "Favourites",
    link: "",
    icon: <Heart className='h-4 w-4' fill='#111' />,
  },
];

const filterButtons = [
  {
    genre: "Action",
    link: "",
  },
  {
    genre: "Adventure",
    link: "",
  },
  {
    genre: "Animation",
    link: "",
  },
  {
    genre: "Biography",
    link: "",
  },
  {
    genre: "Crime",
    link: "",
  },
  {
    genre: "Comedy",
    link: "",
  },
  {
    genre: "Documentary",
    link: "",
  },
  {
    genre: "Drama",
    link: "",
  },
];

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

const Section: React.FC<PropType> = (props) => {
  const { movies } = props;
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number[]>([]);

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  const handleCategoryClicked = (index: number) => {
    setActiveCategoryIndex((prevIndices) => {
      return prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index];
    });
  };

  const scrollContainerRef = useRef(null);

  const scrollContainer = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320; // Adjust the scroll amount as needed
      const scrollPosition = container.scrollLeft + direction * scrollAmount;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className=' text-white mb-8 relative px-5 md:px-0'>
      <div className='relative py-5 flex items-center gap-10 md:gap-0 justify-between border-b-[0.5px] border-white/20'>
        {headerButtons.map(({ title, icon }, index) => (
          <div
            className='flex items-center gap-2 cursor-pointer  w-full '
            onClick={() => handleButtonClick(index)}
            key={index}>
            <p className='hidden md:inline-block'>{icon}</p>
            <p
              className={`text-[13px] transition-all duration-200 ${
                index === activeButtonIndex
                  ? "md:text-[20px] font-bold"
                  : "text-gray-300/50"
              }`}>
              {title}
            </p>
          </div>
        ))}
      </div>
      <div className='relative flex items-center gap-10 justify-between py-5 mb-5 overflow-x-scroll no-scrollbar'>
        {filterButtons.map(({ genre, link }, index) => (
          <Button
            key={index}
            className={`text-[10px] bg-zinc-800  shadow-lg rounded-full w-[100px] py-1 transition-colors duration-300 hover:bg-zinc-600 hover:shadow-2xl ${
              activeCategoryIndex.includes(index) ? "bg-red-500" : ""
            }`}
            onClick={() => handleCategoryClicked(index)}>
            {genre}
          </Button>
        ))}
      </div>
      <div className='w-full flex justify-end '>
        <div className='flex items-center gap-[1px]'>
          <ChevronLeft
            onClick={() => scrollContainer(-1)}
            className='h-6 w-6 text-white/65 hover:text-white transition-colors duration-300 cursor-pointer'
          />
          <ChevronRight
            onClick={() => scrollContainer(+1)}
            className='h-6 w-6 text-white/65 hover:text-white transition-colors duration-300 cursor-pointer'
          />
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className='relative flex gap-5 py-4 w-full  overflow-x-scroll no-scrollbar z-10'>
        {movies.slice(0, 12).map((movie, index) => {
          const dateString = movie.release_date;
          const year = dateString.substring(0, 4);

          return (
            <div
              className='group md:hover:z-50 relative flex flex-col gap-2 cursor-pointer transition ease-in-out  md:hover:scale-110  duration-300 hover:rounded-md'
              key={index}>
              <div className='group relative fill h-[280px] w-[190px] rounded-lg hover:rounded-md'>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  fill
                  alt={movie.title}
                  className='group object-cover rounded-lg hover:rounded-md'
                  loading='lazy'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-[13px] font-semibold line-clamp-1'>
                  {movie.title}
                </p>
                <div className='flex items-center justify-between'>
                  <p className='text-[11px] leading-4 text-gray-300/80'>
                    {year}
                  </p>
                  <div className='flex items-center gap-3'>
                    <Heart className='h-[13px] w-[13px]' />
                    <Eye className='h-[13px] w-[13px]' />
                    <div className='flex items-center gap-1'>
                      <Star className='h-[13px] w-[13px]' />
                      <p className='text-[11px] leading-4 text-white'>
                        {movie.vote_average}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section;
