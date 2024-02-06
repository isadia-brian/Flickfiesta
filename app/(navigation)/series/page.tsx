import Filter from "@/components/Filter";
import ListSkeleton from "@/components/ListSkeleton";
import PaginationNumbers from "@/components/PaginationNumbers";
import TVCard from "@/components/TVCard";
import { Suspense } from "react";
import { discoverTV } from "@/helpers";

const Page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const page = Number(searchParams?.page) || 1;

  const media = "series";
  const data = await discoverTV(page);

  const pages = data.total_pages;

  const shows = data.results;

  return (
    <div className='relative bg-black/90 h-full pb-24'>
      <div className='pt-24 relative max-w-[1200px] mx-auto pb-16 '>
        <h1 className='text-white uppercase font-black text-2xl mb-12'>
          TV Shows
        </h1>

        <div className='mb-12'>
          <Filter media={media} />
        </div>

        <Suspense fallback={<ListSkeleton />}>
          <ul className='grid grid-cols-6 gap-6 text-white'>
            {shows?.map((tv, index) => {
              return (
                <li key={index}>
                  <TVCard tv={tv} hover={true} />
                </li>
              );
            })}
          </ul>
        </Suspense>
      </div>
      <div className='flex items-center justify-center'>
        <PaginationNumbers pages={pages} page={page} media={media} />
      </div>
    </div>
  );
};

export default Page;
