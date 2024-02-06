import MovieCard from "@/components/MovieCard";
import type { Metadata } from "next";
import Filter from "@/components/Filter";
import PaginationNumbers from "@/components/PaginationNumbers";
import { discoverMovies } from "@/helpers";
export const metadata: Metadata = {
  title: "Movies - Playflix",
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

  const movies = data.results;

  return (
    <div className='relative bg-black/90'>
      <div className='pt-24 relative max-w-[1200px] mx-auto pb-16'>
        <h1 className='text-white uppercase font-black text-2xl mb-12'>
          Movies
        </h1>
        <div className='mb-12'>
          <Filter media={media} />
        </div>

        <ul className='grid grid-cols-6 gap-6 text-white'>
          {movies?.map((movie, index) => {
            return (
              <li key={index}>
                <MovieCard movie={movie} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex items-center justify-center mt-10'>
        <PaginationNumbers pages={pages} page={page} media='movies' />
      </div>
    </div>
  );
};

export default Movies;
