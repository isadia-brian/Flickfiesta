import React from "react";
import Image from "next/image";
import { Heart, Eye, Star } from "lucide-react";
import Link from "next/link";
type MovieProps = {
  title: string;
  poster_path: string;
  release_date?: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  first_air_date: string;
  id: number;
};

type PropType = {
  movie: MovieProps;
  hover?: boolean;
  dark?: boolean;
};

const MovieCard: React.FC<PropType> = (props) => {
  const { movie, hover, dark } = props;

  const year = movie?.release_date.substring(0, 4);

  return (
    <Link
      href={{ pathname: "/movies/movie", query: { id: movie?.id } }}
      className={`group relative flex flex-col gap-2 cursor-pointer transition ease-in-out   duration-300  ${
        hover ? "hover:scale-110 hover:-translate-y-3 hover:rounded-md" : ""
      } `}>
      <div className='relative fill h-[280px] w-[190px] rounded-lg hover:rounded-md'>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          fill
          alt={movie.title}
          className='object-cover rounded-lg'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[13px] font-semibold line-clamp-1'>{movie.title}</p>
        <div className='flex items-center justify-between'>
          <p
            className={`text-[11px] leading-4  ${
              dark ? "text-black" : "text-gray-300/80"
            }`}>
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
};

export default MovieCard;
