"use client";

import React, { useState, useEffect } from "react";

import {
  Clapperboard,
  Film,
  AlignHorizontalJustifyStart,
  Star,
  Heart,
  Eye,
  Baby,
  Video,
} from "lucide-react";
import { Button } from "./ui/button";

import Image from "next/image";
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
    icon: <Film className='h-4 w-4' />,
  },
  {
    title: "Animation",
    link: "",
    icon: <Video className='h-4 w-4' />,
  },
  {
    title: "Kids",
    link: "",
    icon: <Baby className='h-4 w-4' />,
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
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
  id: number;
};

const Movie = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [movieList, setMovieList] = useState<MovieProps[]>([]);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number[]>([]);
  const [activeLabelIndex, setActiveLabelIndex] = useState<number[]>([]);

  const handleCategoryClicked = (index: number) => {
    setActiveCategoryIndex((prevIndices) => {
      return prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index];
    });
  };

  const handleButtonClick = async (index: number) => {
    setActiveButtonIndex(index);

    let url;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGJmYWNmNjJiYTNmODNiN2Y0NjIzMGEyZmIzOGU5MSIsInN1YiI6IjY1YTY3OWE4YzUyNWM0MDEyZWY4ZDU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jxtkgn27-eXwVUEx8LYShcFUCx7pxOwuAaebebwmsK8",
      },
    };
    if (index === 0) {
      url =
        "https://api.themoviedb.org/3/movie/popular?include_video=true&language=en-US&page=1";
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => setMovieList(json.results))
        .catch((err) => console.error(`error: ${err}`));
    } else if (index === 1) {
      url =
        "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&language=en-US&page=1";
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => setMovieList(json.results))
        .catch((err) => console.error(`error: ${err}`));
    } else if (index === 2) {
      url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => setMovieList(json.results))
        .catch((err) => console.error(`error: ${err}`));
    }

    setActiveCategoryIndex([]);
  };

  const getMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?include_adult=true&include_video=true&language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGJmYWNmNjJiYTNmODNiN2Y0NjIzMGEyZmIzOGU5MSIsInN1YiI6IjY1YTY3OWE4YzUyNWM0MDEyZWY4ZDU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jxtkgn27-eXwVUEx8LYShcFUCx7pxOwuAaebebwmsK8",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((err) => console.error(`error: ${err}`));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className=' text-white'>
      <div className='h-[70px]  flex items-center justify-between border-b-[0.5px] border-white/20 '>
        {headerButtons.map(({ title, link, icon }, index) => (
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
      <div className='flex items-center justify-between py-4'>
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

      <div className='grid grid-cols-6 gap-5 mt-12'>
        {movieList.slice(0, 12).map((movie, index) => {
          const dateString = movie.first_air_date || movie.release_date;
          const year = dateString?.substring(0, 4);

          return (
            <Link
              href={{
                pathname: "/movies/movie",
                query: { id: movie?.id },
              }}
              className='group relative flex flex-col gap-2 cursor-pointer transition ease-in-out  hover:scale-110 hover:-translate-y-3 duration-300 overflow-hidden '
              key={index}>
              <div className='relative fill h-[280px] rounded-lg'>
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
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Movie;
