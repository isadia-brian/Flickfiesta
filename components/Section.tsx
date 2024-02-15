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
import FilmCard from "./FilmCard";

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

interface DataItem {
  media: "Movie" | "TV";
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  id: number;
  link: string;
  year: number;
}

type PropType = {
  trendingFilm: DataItem[];
};

const Section: React.FC<PropType> = (props) => {
  const { trendingFilm } = props;
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
      <div className='relative pt-8 pb-5 flex items-center gap-10 md:gap-0 justify-between border-b-[0.5px] border-white/20'>
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

      <div className='w-full flex justify-end pt-4 '>
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
        className='relative flex gap-5 pt-5 pb-4 w-full  overflow-x-scroll no-scrollbar z-10'>
        {trendingFilm?.map((film, index) => {
          return <FilmCard film={film} dark={true} />;
        })}
      </div>
    </div>
  );
};

export default Section;
