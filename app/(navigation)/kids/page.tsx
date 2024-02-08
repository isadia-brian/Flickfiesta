import Filter from "@/components/Filter";
import ListSkeleton from "@/components/ListSkeleton";
import PaginationNumbers from "@/components/PaginationNumbers";
import MovieCard from "@/components/MovieCard";
import { Suspense } from "react";
import { discoverAnimations, sortByVoteCount } from "@/helpers";
import Footer from "@/components/Footer";

const Page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const page = Number(searchParams?.page) || 1;

  const media = "animation";
  const data = await discoverAnimations(page);
  const sortedData = await sortByVoteCount();
  let allData = sortedData.results;

  allData.sort((a, b) => {
    return a.vote_average - b.vote_average;
  });

  allData.sort((a, b) => {
    let yearA = Number(a.release_date.substring(0, 4));
    let yearB = Number(b.release_date.substring(0, 4));

    return yearB - yearA;
  });

  //   allData.forEach((e) => {
  //     console.log(`${e.original_title} ${e.vote_average}`);
  //   });

  const pages = data?.total_pages;

  return (
    <div className='relative bg-black/90 h-full w-full px-5 md:px-0'>
      <div className='pt-12 md:pt-24 relative md:max-w-[1200px] md:mx-auto pb-16 '>
        <h1 className='text-white text-center md:text-left uppercase font-black text-lg md:text-2xl mb-12'>
          Kids
        </h1>

        <div className='mb-12'>
          <Filter media={media} />
        </div>

        <Suspense fallback={<ListSkeleton />}>
          <ul className='grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-8 text-white'>
            {allData?.map((movie, index) => {
              return (
                <li key={index}>
                  <MovieCard movie={movie} hover={true} />
                </li>
              );
            })}
          </ul>
        </Suspense>
      </div>
      <div className='flex items-center justify-center pb-12'>
        <PaginationNumbers pages={pages} page={page} media={media} />
      </div>
      <div className='md:max-w-[1200px] md:mx-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
