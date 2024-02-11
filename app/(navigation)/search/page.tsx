"use client";
import { useState, useEffect, useCallback } from "react";

import { Search } from "lucide-react";
import Link from "next/link";
import { Heart, Star, Eye } from "lucide-react";
import Image from "next/image";

const SearchMovie = () => {
  const [searched, setSearched] = useState("");
  const [filmList, setFilmList] = useState([]);

  const searchedFilm = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searched}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGJmYWNmNjJiYTNmODNiN2Y0NjIzMGEyZmIzOGU5MSIsInN1YiI6IjY1YTY3OWE4YzUyNWM0MDEyZWY4ZDU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jxtkgn27-eXwVUEx8LYShcFUCx7pxOwuAaebebwmsK8",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => setFilmList(json.results));
    } catch (error) {
      console.error(error);
    }
  }, [searched]);

  useEffect(() => {
    searchedFilm();
  }, [searched, searchedFilm]);

  return (
    <div className='pt-16'>
      <div className='max-w-[1200px] mx-auto flex flex-col gap-8'>
        <div className='flex items-center gap-2 border border-black  py-3 px-4 rounded-full'>
          <Search className='h-6 w-6' />
          <input
            type='text'
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
            placeholder='Search Movie or TV '
            className='outline-none flex-1'
          />
        </div>
        <div className='grid grid-cols-6 gap-5 mt-12'>
          {filmList.map((film, i) => (
            <Link
              key={i}
              href={{
                pathname: "/movies/movie",
                query: { id: film?.id },
              }}>
              <div className='relative fill h-[280px] rounded-lg bg-black'>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`}
                  fill
                  alt={film.title}
                  className='object-cover rounded-lg'
                  loading='lazy'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-[13px] font-semibold line-clamp-1'>
                  {film?.title}
                </p>
                <div className='flex items-center justify-between'>
                  <p className='text-[11px] leading-4 text-gray-300/80'>year</p>
                  <div className='flex items-center gap-3'>
                    <Heart className='h-[13px] w-[13px]' />
                    <Eye className='h-[13px] w-[13px]' />
                    <div className='flex items-center gap-1'>
                      <Star
                        className='h-[13px] w-[13px]'
                        fill='gold'
                        strokeWidth={0}
                      />
                      <p className='text-[11px] leading-4 text-yellow-800 font-bold'>
                        6
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
