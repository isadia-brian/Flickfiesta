import type { Metadata } from "next";
import Filter from "@/components/Filter";

import PaginationNumbers from "@/components/PaginationNumbers";
import { Suspense } from "react";
import { discoverAnimations } from "@/actions/film";
import Footer from "@/components/Footer";
import FilmCard from "@/components/FilmCard";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Watch The Latest Kids Movies - Free",
  description: "Free Movies & Tv Shows Online",
};

const Page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const page = Number(searchParams?.page) || 1;

  const media = "kids";
  const allData = await discoverAnimations(page);

  const pages = 3;

  return (
    <div className='relative bg-black/90 h-max w-full px-4'>
      <div className='pt-12 md:pt-24 relative pb-16 '>
        <h1 className='text-white text-center md:text-left uppercase font-black text-lg md:text-2xl mb-9'>
          Kids
        </h1>
        <div className='mb-12'>
          <Filter media={media} />
        </div>
        <Suspense fallback={<Preloader />}>
          <ul className='grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-8 text-white'>
            {allData?.map((film, index) => {
              return (
                <li key={index}>
                  <FilmCard film={film} dark={true} hover={true} key={index} />
                </li>
              );
            })}
          </ul>
        </Suspense>
        N
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
