"use client";

import React, { useState, useRef } from "react";

import {
  TrendingUp,
  Star,
  Heart,
  Eye,
  Flame,
  Plus,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const headerButtons = [
  {
    title: "Trends Now",
    link: "",
    icon: <TrendingUp className='h-4 w-4' />,
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
  {
    title: "Recently Added",
    link: "",
    icon: <Plus className='h-4 w-4' />,
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
    <div className=' text-white mb-8 relative'>
      <div className=' relative py-5 flex items-center justify-between border-b-[0.5px] border-white/20 '>
        {headerButtons.map(({ title, icon }, index) => (
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => handleButtonClick(index)}
            key={index}>
            <p>{icon}</p>
            <h1
              className={`text-[13px] transition-all duration-200 ${
                index === activeButtonIndex
                  ? "text-[20px] font-bold"
                  : "text-gray-300/50"
              }`}>
              {title}
            </h1>
          </div>
        ))}
      </div>
      <div className='relative w-[1200px] mx-auto  flex items-center justify-between py-5'>
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
      <div
        ref={scrollContainerRef}
        className='relative flex gap-5 py-4 w-full  overflow-x-scroll no-scrollbar z-10'>
        {movies.slice(0, 12).map((movie, index) => {
          const dateString = movie.release_date;
          const year = dateString.substring(0, 4);

          return (
            <div
              className='group relative flex flex-col gap-2 cursor-pointer transition ease-in-out  hover:scale-110 hover:-translate-y-3 duration-300 hover:rounded-md '
              key={index}>
              <div className='relative fill h-[280px] w-[190px] rounded-lg hover:rounded-md'>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  fill
                  alt={movie.title}
                  className='object-cover rounded-lg'
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
      <Button
        onClick={() => scrollContainer(-1)}
        variant='ghost'
        size='icon'
        className='h-20 w-20  bg-transparent hover:bg-transparent absolute top-1/2 z-50  left-1'>
        <ChevronLeft className='h-20 w-20 text-slate-600 hover:text-white   transition-colors duration-300' />
      </Button>
      <Button
        onClick={() => scrollContainer(+1)}
        variant='ghost'
        size='icon'
        className='h-20 w-20 rounded-full bg-transparent hover:bg-transparent absolute top-1/2  right-1 z-50'>
        <ChevronRight className='h-20 w-20 text-slate-600 hover:text-white transition-colors duration-300' />
      </Button>
    </div>
  );
};

export default Section;
