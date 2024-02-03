import MovieCard from "@/components/MovieCard";
import type { Metadata } from "next";
import Filter from "@/components/Filter";

export const metadata: Metadata = {
  title: "Movies - Playflix",
  description: "Free Movies & Tv Shows Online",
};

async function getMovies() {
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Movies = async () => {
  const media = "movie";
  const newData = await getMovies();

  const movies = newData.results;

  return (
    <div className='relative bg-black/90'>
      <div className='pt-24 relative max-w-[1200px] mx-auto'>
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
    </div>
  );
};

export default Movies;
