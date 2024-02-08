import Filter from "@/components/Filter";
import ListSkeleton from "@/components/ListSkeleton";
import PaginationNumbers from "@/components/PaginationNumbers";
import TVCard from "@/components/TVCard";
import { Suspense } from "react";
import { discoverTV } from "@/helpers";
import Footer from "@/components/Footer";

const Page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const page = Number(searchParams?.page) || 1;
  const media = "tv";
  const data = await discoverTV(page);
  const pages = data.total_pages;
  let shows = data.results;

  shows.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });

  shows.sort((a, b) => {
    let yearA = Number(a.first_air_date.substring(0, 4));
    let yearB = Number(b.first_air_date.substring(0, 4));

    return yearB - yearA;
  });

  return (
    <div className='relative bg-black/90 h-full w-full px-5 md:px-0'>
      <div className='pt-12 md:pt-24 relative md:max-w-[1200px] md:mx-auto pb-16 '>
        <h1 className='text-white text-center md:text-left uppercase font-black text-lg md:text-2xl mb-12'>
          TV Shows
        </h1>

        <div className='mb-12'>
          <Filter media={media} />
        </div>

        <Suspense fallback={<ListSkeleton />}>
          <ul className='grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-8 text-white'>
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
      <div className='flex items-center justify-center pb-12'>
        <PaginationNumbers pages={pages} page={page} media='series' />
      </div>
      <div className='md:max-w-[1200px] md:mx-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
