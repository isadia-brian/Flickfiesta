import { Play, PlayCircle } from "lucide-react";
import Link from "next/link";

const RecommendedSection = () => {
  return (
    <div className='w-[1200px] mx-auto my-12 text-white flex flex-col gap-10'>
      <div className='h-[70px]  flex items-center  border-b-[0.5px] border-white/20 '>
        <h5 className='text-[20px] font-bold'>Recommended</h5>
      </div>
      <div className='grid grid-cols-2 h-[400px] gap-3'>
        <div className=' bg-white/70 flex flex-col px-7 py-4 justify-end rounded-2xl'>
          <div className='flex w-[500px] mx-auto gap-5 items-center'>
            <div className='h-[200px] bg-black w-40'></div>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <h5 className='font-semibold text-xl  max-w-[250px]'>
                  Aquaman and the Lost Kingdom
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
        <div className='grid grid-cols-2 gap-3'>
          <div className='px-4 py-3 flex flex-col justify-end gap-1 bg-white text-black font-semibold  rounded-2xl'>
            <h5 className='max-w-[200px]'>Avatar:The Way of Water</h5>
            <div className='text-xs flex items-center gap-3 font-extralight'>
              <p>Action</p>
              <div className='flex items-center gap-1'>
                <div className='h-1 w-1 rounded-full bg-red-500/65' />
                <p>English</p>
              </div>
            </div>
          </div>
          <div className='px-4 py-3 flex flex-col justify-end gap-1 bg-white text-black font-semibold  rounded-2xl'>
            <h5 className='max-w-[200px]'>ted</h5>
            <div className='text-xs flex items-center gap-3 font-extralight'>
              <p>Comedy</p>
              <div className='flex items-center gap-1'>
                <div className='h-1 w-1 rounded-full bg-red-500/65' />
                <p>English</p>
              </div>
            </div>
          </div>
          <div className='px-4 py-3 flex flex-col justify-end gap-1 bg-white text-black font-semibold  rounded-2xl'>
            <h5 className='max-w-[200px]'>The Marvels</h5>
            <div className='text-xs flex items-center gap-3 font-extralight'>
              <p>Sci Fi</p>
              <div className='flex items-center gap-1'>
                <div className='h-1 w-1 rounded-full bg-red-500/65' />
                <p>English</p>
              </div>
            </div>
          </div>
          <div className='px-4 py-3 flex flex-col justify-end gap-1 bg-white text-black font-semibold  rounded-2xl'>
            <h5 className='max-w-[200px]'>Lift</h5>
            <div className='text-xs flex items-center gap-3 font-extralight'>
              <p>Action</p>
              <div className='flex items-center gap-1'>
                <div className='h-1 w-1 rounded-full bg-red-500/65' />
                <p>English</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;
