"use client";

import React, { useState, useRef, useEffect } from "react";

import {
  TrendingUp,
  Heart,
  Flame,
  AlignHorizontalJustifyStart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  filterCategory: "Trending" | "Popular";
}

type PropType = {
  trendingFilm: DataItem[];
};

const useFilter = (data: DataItem[], filter: string) => {
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);

  useEffect(() => {
    // If the filter is "Trending" return the original data

    if (filter === "Trending") {
      setFilteredData(data.filter((item) => item.filterCategory === filter));
    } else {
      //Other wise filter the data by type
      setFilteredData(data.filter((item) => item.filterCategory === filter));
    }
  }, [data, filter]); //Update filtered data when the data or filter changes

  return filteredData;
};

const Section: React.FC<PropType> = (props) => {
  const { trendingFilm } = props;
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [filter, setFilter] = useState<string>("Trending");

  const [data, setData] = useState<DataItem[]>(trendingFilm);

  // The filtered data that is returned by the custom hook
  const filteredData = useFilter(data, filter);

  const handleFilter = (index: number) => {
    setActiveButtonIndex(index);

    if (index === 0) {
      setFilter("Trending");
    } else if (index === 1) {
      setFilter("Trending");
    } else if (index === 2) {
      setFilter("Popular");
    } else {
      setFilter("Trending");
    }
  };

  const scrollContainerRef = useRef(null);

  const scrollContainer = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 450; // Adjust the scroll amount as needed
      const scrollPosition = container.scrollLeft + direction * scrollAmount;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className=' text-white mb-8 relative px-5 md:px-0  w-full'>
      <div className='relative pt-8 pb-5 flex items-center gap-10 md:gap-0 justify-between border-b-[0.5px] border-white/20'>
        {headerButtons.map(({ title, icon }, index) => (
          <div
            className='flex items-center gap-2 cursor-pointer  w-full md:w-max '
            onClick={() => handleFilter(index)}
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
        className=' flex gap-4 pt-5 pb-4 w-full  overflow-x-scroll no-scrollbar'>
        {filteredData?.map((film, index) => {
          return <FilmCard film={film} dark={true} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Section;
