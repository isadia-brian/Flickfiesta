import { Suspense } from "react";
import Carousel from "@/components/Carousel";
import Film from "@/components/Film";
import Section from "@/components/Section";
import RecommendedSection from "@/components/RecommendedSection";
import Footer from "@/components/Footer";
import {
  getRecommendedContent,
  getTrendingData,
  getTrendingFilm,
  getPopularFilm,
} from "@/helpers";

import Preloader from "@/components/Preloader";

export default async function Home() {
  const trending = await getTrendingData();
  const trendingFilm = await getTrendingFilm();
  const recommendedFilm = await getRecommendedContent();
  const allData = await getPopularFilm();

  return (
    <main className='bg-black/90'>
      <div className='relative h-full'>
        <div className='relative'>
          <Suspense fallback={<Preloader />}>
            <Carousel trending={trending} />
          </Suspense>
        </div>
        <div className='relative pb-7 w-full md:w-[1200px] mx-auto'>
          <Section trendingFilm={trendingFilm} />
          <Film allData={allData} />
          <RecommendedSection recommended={recommendedFilm} />
          <div className='mt-20 w-full'>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
