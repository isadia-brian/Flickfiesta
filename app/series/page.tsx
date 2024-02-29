import type { Metadata } from "next";
import Filter from "@/components/Filter";
import PaginationNumbers from "@/components/PaginationNumbers";
import { Suspense } from "react";
import { discoverSeries } from "@/actions/film";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FilmCard from "@/components/FilmCard";

export const metadata: Metadata = {
  title: "Watch The Latest Tv Shows Online - Free",
  description: "Free Movies & Tv Shows Online",
};

const Page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const page = Number(searchParams?.page) || 1;
  const media = "tv";
  const allData = await discoverSeries(page);
  const pages = 10;

  return (
    <div className='relative bg-black/90 w-full px-4'>
      <div className='pt-20 md:pt-24 relative pb-16 '>
        <h1 className='text-white text-center md:text-left uppercase font-black text-lg md:text-2xl mb-9'>
          TV Shows
        </h1>
        <div className='mb-12'>
          <Filter media={media} />
        </div>
        <Suspense fallback={<Preloader />}>
          <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4  lg:gap-x-2 gap-y-8 text-white'>
            {allData?.map((film, index) => {
              return (
                <li key={index}>
                  <FilmCard film={film} hover={true} dark={true} />
                </li>
              );
            })}
          </ul>
        </Suspense>
        N
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
