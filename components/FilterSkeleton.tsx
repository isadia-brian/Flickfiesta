import { Skeleton } from "@/components/ui/skeleton";

const FilterSkeleton = () => {
  return (
    <div className='relative'>
      <div className='relative w-full  pb-3 '>
        <div className='flex items-center gap-4'>
          <Skeleton className=' px-3 py-2  w-[300px] h-[35px]  rounded-md' />
          <Skeleton className=' px-3 py-2  w-[100px] h-[35px]   rounded-md' />
        </div>
      </div>
      <div className='w-full border-b-[0.5px] border-zinc-700 py-3 pb-5 flex items-center gap-3 '>
        <Skeleton className='w-[150px] h-[40px] ' />
        <Skeleton className='w-[150px] h-[40px] ' />
        <Skeleton className='w-[150px] h-[40px] ' />
        <Skeleton className='w-[150px] h-[40px] ' />
        <Skeleton className='w-[150px] h-[40px] ' />
        <Skeleton className='w-[150px] h-[40px] ' />
      </div>
    </div>
  );
};

export default FilterSkeleton;
