import type { Metadata } from "next";
import Filter from "@/components/Filter";
import PaginationNumbers from "@/components/PaginationNumbers";
import { discoverMovies } from "@/actions/film";
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
  const alldata = await discoverMovies(page);

  const media = "movie";

  const pages = 10;

  const movies = alldata;

  return (
    <div className='relative bg-black/90 w-full px-4'>
      <div className='pt-20 md:pt-24 relative pb-16'>
        <h1 className='text-white text-center md:text-left uppercase font-black text-lg md:text-2xl mb-9'>
          Movies
        </h1>
        <div className='mb-12'>
          <Filter media={media} />
        </div>

        <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4  lg:gap-x-2 gap-y-8 text-white'>
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
