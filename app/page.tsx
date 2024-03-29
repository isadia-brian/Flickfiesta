import { Suspense } from "react";
import Carousel from "@/components/Carousel";
import Film from "@/components/Film";
import Section from "@/components/Section";
import RecommendedSection from "@/components/RecommendedSection";
import Footer from "@/components/Footer";

import {
  getRecommendedContent,
  getTrendingFilm,
  getPopularFilm,
  getTrendingData,
} from "@/actions/film";

import Preloader from "@/components/Preloader";

export default async function Home() {
  const trending = await getTrendingData();
  const trendingFilm = await getTrendingFilm();
  const recommendedFilm = await getRecommendedContent();
  const allData = await getPopularFilm();

  return (
    <main className='bg-black/90'>
      <div className='relative'>
        <div className='relative'>
          <Suspense fallback={<Preloader />}>
            <Carousel trending={trending} />
          </Suspense>
        </div>
        <div className='relative pb-7 px-4'>
          <Section trendingFilm={trendingFilm} />
          <Film allData={allData} />
          <RecommendedSection recommended={recommendedFilm} />
          <div className='mt-16 w-full'>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
