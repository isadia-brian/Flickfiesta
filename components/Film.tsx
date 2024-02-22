"use client";

import React, { useState, useEffect } from "react";
import { Clapperboard, Film as Series, Baby, Video } from "lucide-react";
import { Button } from "./ui/button";
import { getPopularFilm } from "@/helpers";

import FilmCard from "./FilmCard";
import Link from "next/link";

const headerButtons = [
  {
    title: "Movies",
    link: "",
    icon: <Clapperboard className='h-4 w-4' />,
  },
  {
    title: "Series",
    link: "",
    icon: <Series className='h-4 w-4' />,
  },
  {
    title: "Animation",
    link: "",
    icon: <Video className='h-4 w-4' />,
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
  media: "Movie" | "TV" | "Animation";
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  id: number;
  link: string;
  year: number;
}

// custom hook that takes an array of data and a filter value and returns a filtered array based on the type property

const useFilter = (data: DataItem[], filter: string) => {
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);

  useEffect(() => {
    // If the filter is "initial" return the original data

    if (filter === "Movies") {
      setFilteredData(data.filter((item) => item.media === "Movie"));
    } else if (filter === "Series") {
      //Other wise filter the data by type
      setFilteredData(data.filter((item) => item.media === "TV"));
    } else {
      setFilteredData(data.filter((item) => item.media === "Animation"));
    }
  }, [data, filter]); //Update filtered data when the data or filter changes

  return filteredData;
};

//Main Component that renders the data

const Film = (props) => {
  const { allData } = props;
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number[]>([]);
  const [activeLabelIndex, setActiveLabelIndex] = useState<number[]>([]);
  const [navLink, setNavLink] = useState<string>("/movies");
  const [data, setData] = useState<DataItem[]>(allData);

  //The filter value controlled by the buttons
  const [filter, setFilter] = useState<string>("Movies");

  // The filtered data that is returned by the custom hook
  const filteredData = useFilter(data, filter);

  const handleCategoryClicked = (index: number) => {
    setActiveCategoryIndex((prevIndices) => {
      return prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index];
    });
  };

  const handleFilter = (index: number) => {
    setActiveButtonIndex(index);

    if (index === 0) {
      setFilter("Movies");
      setNavLink("/movies");
    } else if (index === 1) {
      setFilter("Series");
      setNavLink("/series");
    } else {
      setFilter("Animation");
      setNavLink("/kids");
    }

    setActiveCategoryIndex([]);
  };

  return (
    <div className='relative h-full text-white px-5 md:px-0'>
      <div className='h-[70px]  flex items-center justify-between gap-10 md:gap-0 border-b-[0.5px] border-white/20 '>
        {headerButtons.map(({ title, icon }, index) => (
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => handleFilter(index)}
            key={index}>
            <p className='hidden md:inline-block'>{icon}</p>
            <h1
              className={`text-[13px] transition-all duration-200 ${
                index === activeButtonIndex
                  ? "md:text-[20px] font-bold"
                  : "text-gray-300/50"
              }`}>
              {title}
            </h1>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between gap-10 pt-4 pb-6 overflow-x-scroll no-scrollbar'>
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

      <div className='flex justify-end'>
        <Link href={navLink} className='text-xs underline underline-offset-2'>
          see all
        </Link>
      </div>

      <div className='flex gap-5 w-full h-full pt-4 pb-10 overflow-x-scroll no-scrollbar md:grid grid-cols-6 gap-y-10'>
        {filteredData?.map((film, index) => {
          return <FilmCard film={film} dark={true} hover={true} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Film;
