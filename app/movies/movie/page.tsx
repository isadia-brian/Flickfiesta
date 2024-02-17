import { Button } from "@/components/ui/button";
import { getSingleMovie } from "@/helpers";

import { Play, Star, Youtube as Tube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import YouTube from "react-youtube";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Movie = async ({ searchParams }: Props) => {
  const idString = searchParams?.id;
  const id = Number(idString);
  const movie = await getSingleMovie(id);
  let rating = Math.round(movie?.vote_average * 10) / 10;
  const year = movie?.release_date.substring(0, 4);
  const media = "movie";

  return (
    <div className='relative'>
      <div className='relative h-screen flex flex-col justify-center'>
        <div className='relative h-full w-full'>
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
            alt='tv poster'
            fill
            className='object-cover'
          />
        </div>
        <div className='absolute h-full w-full left-0 bg-gradient-to-t from-black/40 via-black/40 text-white flex flex-col justify-center px-4 md:px-10'>
          <div className='flex flex-col gap-7 '>
            <div className='relative'>
              <h1 className='relative text-white text-4xl md:text-5xl font-bold md:w-[500px] leading-tight'>
                {movie?.title}
              </h1>
              <div className='h-[4px] md:h-[6px] w-12 md:w-16 bg-red-500 -skew-x-[30deg]' />
            </div>

            <div className='flex flex-col gap-2 md:w-[500px] md:pr-4'>
              <div className='flex items-center gap-3 md:gap-5'>
                <div className='flex items-center gap-1'>
                  <Star fill='yellow' className='h-4 w-4' strokeWidth={0} />
                  <p className='text-[12px]'>{rating}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='h-1 w-1 bg-red-500/65 rounded-full' />
                  <div>
                    <p className='text-[12px]'>2hrs 22mins</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='h-1 w-1 bg-red-500/65 rounded-full' />
                  <div className='border-[2px] border-white px-3 py-1 rounded-full flex items-center justify-center'>
                    <p className='text-[12px]'>PG-13</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='h-1 w-1 bg-red-500/65 rounded-full' />
                  <p className='text-[12px]'>{year}</p>
                </div>
                <div className='flex items-center gap-2'></div>
              </div>

              <div className='text-[12px] flex items-center gap-3'>
                <p>Genre:</p>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-3'>
                    <p>Action</p>
                    <div className='h-4 md:h-6 w-[3px] bg-red-500 -skew-x-[15deg]' />
                  </div>
                  <div className='flex items-center gap-3'>
                    <p>Adventure</p>
                    <div className='h-4 md:h-6 w-[3px] bg-red-500 -skew-x-[15deg]' />
                  </div>
                  <div className='flex items-center gap-3'>
                    <p>Drama</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-white text-sm md:w-[500px]'>
              <p className='line-clamp-5 pr-4 leading-relaxed'>
                {movie?.overview}
              </p>
            </div>

            <div className='flex items-center gap-3 px-2'>
              <Link
                href={{
                  pathname: `/watch/${movie?.title}`,
                  query: { name: movie?.title, media: media, id: id },
                }}
                className='flex items-center justify-center whitespace-nowrap md:w-[150px] h-9 px-4 md:px-0  rounded-none gap-2  py-6 bg-gradient-to-r from-orange-500 to-red-500 -skew-x-[30deg] text-sm font-medium transition-colors gradient element-to-rotate'>
                <Play className='h-4 w-4 skew-x-[30deg]' fill='white' />
                <span className='skew-x-[30deg]'>WATCH NOW</span>
              </Link>
              <Button className='flex items-center justify-center whitespace-nowrap md:w-[150px] gap-2 px-7 md:px-0 py-6 bg-white/50 backdrop-filter backdrop-blur-sm -skew-x-[30deg] rounded-none text-black font-medium hover:bg-black hover:text-white text-sm'>
                <Tube className='h-5 w-5 skew-x-[30deg]' />
                <span className='skew-x-[30deg]'>TRAILER</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='text-black relative px-4 md:px-10 py-8'>
        <h5 className='font-semibold text-2xl'>Cast</h5>
      </div>
    </div>
  );
};

export default Movie;
