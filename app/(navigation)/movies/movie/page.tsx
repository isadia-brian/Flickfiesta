import VideoSlide from "@/components/VideoSlide";
import { Button } from "@/components/ui/button";
import { getSingleMovie, getVideoData } from "@/helpers";

import { Play, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Movie = async ({ searchParams }: Props) => {
  const idString = searchParams?.id;
  const id = Number(idString);

  const movie = await getSingleMovie(id);

  let rating = Math.round(movie?.vote_average * 10) / 10;
  const releaseDateString = movie?.release_date;

  const videos = await getVideoData(id);

  const keys = videos?.map((item) => item.key);

  return (
    <div className='relative h-screen'>
      <div className='absolute top-0 left-0 w-full h-screen'>
        <div className='relative h-full w-full'>
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
            alt='movie poster'
            fill
            className='object-cover'
          />
          <div className='absolute h-full w-full left-0 top-0' />
          <div className='absolute h-full w-full left-0 text-white top-0 z-30 grid grid-cols-2 bg-gradient-to-t from-black/90 '>
            <div className='px-16 h-full flex flex-col justify-end py-24 gap-7'>
              <h1 className='relative text-white text-5xl font-bold w-[500px] leading-tight'>
                {movie?.title}
                <div className='h-2 w-16 bg-red-500' />
              </h1>
              <div className='flex flex-col gap-2 w-[500px] pr-4'>
                <div className='flex items-center gap-12'>
                  <div className='flex items-center gap-1'>
                    <Star fill='yellow' className='h-4 w-4' strokeWidth={0} />
                    <p>{rating}</p>
                  </div>
                  <div className='flex items-center gap-3'>
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
                      <p className='text-[12px]'>2023</p>
                    </div>
                  </div>
                </div>

                <div className='text-sm flex items-center gap-3'>
                  <p>Genre:</p>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-3'>
                      <p>Action</p>
                      <div className='h-6 w-[3px] bg-red-500 -skew-x-[15deg]' />
                    </div>
                    <div className='flex items-center gap-3'>
                      <p>Adventure</p>
                      <div className='h-6 w-[3px] bg-red-500 -skew-x-[15deg]' />
                    </div>
                    <div className='flex items-center gap-3'>
                      <p>Drama</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='text-white text-sm w-[500px]'>
                <p className='line-clamp-5 pr-4 leading-relaxed'>
                  {movie?.overview}
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <Link
                  href={`/watch/movies/${id}`}
                  className='flex items-center justify-center whitespace-nowrap w-[180px] h-9 px-4 rounded-none gap-2 py-6 bg-gradient-to-r from-orange-500 to-red-500 -skew-x-[30deg] text-sm font-medium transition-colors gradient element-to-rotate'>
                  <Play className='h-4 w-4 skew-x-[30deg]' fill='white' />
                  <span className='skew-x-[30deg]'>WATCH NOW</span>
                </Link>
                <Button className='flex items-center w-[180px] gap-2 py-6 bg-white/30 backdrop-filter backdrop-blur-sm -skew-x-[30deg] rounded-none hover:bg-black'>
                  <Plus
                    className='h-4 w-4 skew-x-[30deg]'
                    fill='white'
                    strokeWidth={3}
                  />
                  <span className='skew-x-[30deg]'>FAVOURITES</span>
                </Button>
              </div>
            </div>
            <div className='pl-16 h-full flex  flex-col justify-end py-24 gap-16'>
              <div className='flex flex-col gap-2 w-full'>
                <h5 className='font-medium text-lg'>Trailers</h5>
                <div className='flex items-center gap-4 overflow-x-scroll'>
                  {keys.map((item, index) => {
                    return <VideoSlide key={index} id={item} />;
                  })}
                </div>
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <h5 className='font-medium text-lg'>Cast</h5>
                <div className='flex items-center gap-4 overflow-x-scroll no-scrollbar'>
                  {Array.from({ length: 5 }).map((_, i) => {
                    return (
                      <div key={i} className='flex flex-col items-center gap-2'>
                        <div className='h-[50px] w-[50px] bg-slate-200 rounded-full' />
                        <p className='text-xs text-center'>John Doe</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
