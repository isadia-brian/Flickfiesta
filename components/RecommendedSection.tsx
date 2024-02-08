import { getRecommendedContent } from "@/helpers";
import { Play, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RecommendedSection = async () => {
  const results = await getRecommendedContent();
  return (
    <div className=' my-12 text-white flex flex-col gap-10 px-5 md:px-0'>
      <div className='h-[70px]  flex items-center  border-b-[0.5px] border-white/20 '>
        <h5 className='text-[20px] font-bold'>Recommended</h5>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 h-[450px] md:h-[400px] gap-3'>
        {results.slice(0, 1).map((film, index) => {
          const title = film.name || film.title;
          const image = film.poster_path;
          const backgroundImage = film.backdrop_path;

          return (
            <div
              className='relative bg-white/70  flex flex-col md:px-7 py-4 justify-end rounded-2xl'
              key={index}>
              <div className='absolute left-0 h-full w-full bg-black rounded-2xl top-0'>
                <div className='h-full w-full bg-black relative rounded-2xl'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${backgroundImage}`}
                    alt={title}
                    fill
                    className='object-cover rounded-2xl'
                    loading='lazy'
                  />
                </div>
                <div className='absolute h-full w-full top-0  rounded-2xl bg-gradient-to-t from-black/70 via-black/85' />
              </div>
              <div className='flex md:w-[500px] md:mx-auto px-4 gap-5 md:items-center'>
                <div className='hidden md:flex h-[200px] bg-black w-[150px] shadow-md shadow-red-500/55 relative rounded-md'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${image}`}
                    alt={title}
                    fill
                    className='object-cover rounded-md drop-shadow-lg'
                    loading='lazy'
                  />
                </div>
                <div className='flex flex-col gap-6 z-50 '>
                  <div className='flex flex-col gap-2'>
                    <h5 className='font-semibold text-xl  md:max-w-[250px]'>
                      {title}
                    </h5>

                    <div className='text-xs flex items-center gap-3 font-extralight'>
                      <p>Action</p>
                      <div className='flex items-center gap-1'>
                        <div className='h-1 w-1 rounded-full bg-red-500/65' />
                        <p>English</p>
                      </div>
                    </div>
                  </div>

                  <div className='text-xs flex items-center gap-3 font-extralight'>
                    <Link
                      href='#'
                      className='flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-3  rounded-full cursor-pointer w-[130px] h-10'>
                      <span>
                        <PlayCircle className='h-6 w-6' />
                      </span>
                      WATCH NOW
                    </Link>
                    <Link
                      href='#'
                      className='flex items-center justify-center gap-2 border-[0.5px] h-10 w-[130px] border-white  px-3 py-2 rounded-full cursor-pointer'>
                      <span>
                        <Play className='h-6 w-6' />
                      </span>
                      TRAILER
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className='grid grid-cols-2 gap-3'>
          {results.slice(1).map((film, index) => {
            const title = film.name || film.title;

            const backgroundImage = film.backdrop_path;

            return (
              <div
                className='relative px-4 py-3 flex flex-col justify-end gap-1 text-black font-semibold  rounded-2xl cursor-pointer'
                key={index}>
                <div className='top-0 z-50 h-full w-full absolute bg-gradient-to-t from-black/70 left-0 rounded-2xl' />

                <div className='top-0 h-full w-full absolute left-0 rounded-2xl'>
                  <div className='h-full bg-black w-full relative rounded-2xl'>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${backgroundImage}`}
                      alt={title}
                      fill
                      className='object-cover rounded-2xl'
                      loading='lazy'
                    />
                  </div>
                </div>
                <h5 className='max-w-[200px] z-50 text-white line-clamp-1'>
                  {title}
                </h5>
                <div className='text-xs flex items-center gap-3 font-extralight z-50 text-white'>
                  <p>Action</p>
                  <div className='flex items-center gap-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500/65' />
                    <p>English</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;
