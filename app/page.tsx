import Carousel from "@/components/Carousel";
import Film from "@/components/Film";
import Section from "@/components/Section";
import RecommendedSection from "@/components/RecommendedSection";
import Footer from "@/components/Footer";
import {
  getRecommendedContent,
  getTrendingData,
  getTrendingFilm,
} from "@/helpers";

export default async function Home() {
  const trending = await getTrendingData();
  const trendingFilm = await getTrendingFilm();
  const recommendedFilm = await getRecommendedContent();

  return (
    <main className='bg-black/90'>
      <div className='relative h-full'>
        <div className='relative'>
          <Carousel trending={trending} />
        </div>
        <div className='relative pb-7 w-full md:w-[1200px] mx-auto'>
          <Section trendingFilm={trendingFilm} />
          <Film />
          <RecommendedSection recommended={recommendedFilm} />
          <div className='mt-20 w-full'>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
