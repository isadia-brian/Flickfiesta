import { Skeleton } from "@/components/ui/skeleton";

const ListSkeleton = () => {
  return (
    <div className='grid grid-cols-6 gap-6 text-white'>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i}>
          <Skeleton className='h-[280px] w-[190px] rounded-lg' />
        </div>
      ))}
    </div>
  );
};

export default ListSkeleton;
