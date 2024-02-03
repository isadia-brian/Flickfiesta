"use client";

import Filter from "@/components/Filter";
import TVCard from "@/components/TVCard";
import { useEffect, useState, useRef } from "react";

const Series = () => {
  const [tvShows, setTVShows] = useState([]);
  const media = "tv";

  const fetchAllData = async () => {
    const url = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;

    try {
      const res = await fetch(url);
      const json = await res.json();

      setTVShows(json.results);
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className='relative bg-black/90 h-full pb-24'>
      <div className='pt-24 relative max-w-[1200px] mx-auto'>
        <h1 className='text-white uppercase font-black text-2xl mb-12'>
          TV Shows
        </h1>
        <div className='mb-12'>
          <Filter media={media} />
        </div>

        <ul className='grid grid-cols-6 gap-6 text-white'>
          {tvShows?.map((tv, index) => {
            return (
              <li key={index}>
                <TVCard tv={tv} hover={true} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Series;
