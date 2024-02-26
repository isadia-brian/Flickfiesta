import MovieCard from "@/components/MovieCard";
import type { Metadata } from "next";
import Filter from "@/components/Filter";
import PaginationNumbers from "@/components/PaginationNumbers";
import { discoverMovies } from "@/helpers";
import Footer from "@/components/Footer";

import FilmCard from "@/components/FilmCard";

export const metadata: Metadata = {
  title: "Watch The Latest Movies Online - Free",
  description: "Free Movies & Tv Shows Online",
};

const Movies = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const page = Number(searchParams?.page) || 1;

  const media = "movie";
  const data = await discoverMovies(page);
  const pages = data.total_pages;

  let movies = data.results;

  movies.sort((a, b) => {
    let yearA = Number(a.release_date.substring(0, 4));
    let yearB = Number(b.release_date.substring(0, 4));

    return yearB - yearA;
  });

  return (
    <div className='relative bg-black/90 w-full px-5 md:px-0 h-max'>
      <div className='pt-12 md:pt-24 relative md:max-w-[1200px] md:mx-auto pb-16'>
        <h1 className='text-white text-center md:text-left uppercase font-black text-lg md:text-2xl mb-12'>
          Movies
        </h1>
        <div className='mb-12'>
          <Filter media={media} />
        </div>

        <ul className='grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-8 text-white'>
          {movies?.map((movie, index) => {
            return (
              <li key={index}>
                <FilmCard film={movie} hover={true} dark={true} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex items-center justify-center pb-12'>
        <PaginationNumbers pages={pages} page={page} media='movies' />
      </div>
      <div className='md:max-w-[1200px] md:mx-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default Movies;
