import { getRecommendedContent } from "@/helpers";
import { Play, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DataItem {
  id: string;
  title?: string;
  image: string;
  backgroundImage: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  link: string;
}

type PropType = {
  recommended: DataItem[];
};

const RecommendedSection: React.FC<PropType> = (props) => {
  const { recommended } = props;
  return (
    <div className=' mb-12 text-white flex flex-col gap-10 px-5 md:px-0'>
      <div className='h-[70px]  flex items-center  border-b-[0.5px] border-white/20 '>
        <h5 className='text-[20px] font-bold'>Recommended</h5>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 h-[450px] md:h-[400px] gap-3'>
        {recommended.slice(0, 1).map((film, index) => {
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
                <div className='flex flex-col gap-6 z-40 '>
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
                      href={{ pathname: film.link, query: { id: film.id } }}
                      className='flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-3  rounded-full cursor-pointer w-full  h-10 font-bold text-black'>
                      <span>
                        <PlayCircle className='h-6 w-6' />
                      </span>
                      WATCH NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className='grid grid-cols-2 gap-3'>
          {recommended.slice(1).map((film, index) => {
            const title = film.name || film.title;

            const backgroundImage = film.backdrop_path;

            return (
              <div
                className='group relative px-4 py-3 flex flex-col justify-end gap-1 text-black font-semibold rounded-2xl shadow-lg ring-1 ring-white/10 hover:cursor-pointer hover:ring-white/50 hover:shadow-2xl'
                key={index}>
                <div className='top-0 z-40 h-full w-full absolute bg-gradient-to-t from-black/70 left-0 rounded-2xl' />
                <div className='top-0 z-50 h-full w-full absolute transition-colors duration-200 group-hover:bg-white/80 left-0 rounded-2xl flex items-center justify-center px-3 gap-2'>
                  <Link
                    href={{ pathname: film.link, query: { id: film.id } }}
                    className='flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-2 rounded-full cursor-pointer h-10 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <span>
                      <PlayCircle className='h-5 w-5' />
                    </span>
                    WATCH NOW
                  </Link>
                </div>

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

                <h5 className='max-w-[200px] z-40 text-white line-clamp-1'>
                  {title}
                </h5>
                <div className='text-xs flex items-center gap-3 font-extralight z-40 text-white'>
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
