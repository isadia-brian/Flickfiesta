import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import Film from "@/components/Film";
import Section from "@/components/Section";
import RecommendedSection from "@/components/RecommendedSection";
import Footer from "@/components/Footer";
import { getPopularFilm, getTrendingData } from "@/helpers";

async function getMovies() {
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGJmYWNmNjJiYTNmODNiN2Y0NjIzMGEyZmIzOGU5MSIsInN1YiI6IjY1YTY3OWE4YzUyNWM0MDEyZWY4ZDU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jxtkgn27-eXwVUEx8LYShcFUCx7pxOwuAaebebwmsK8",
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const newData = await getMovies();
  const movies = newData.results;
  const popularFilm = await getPopularFilm();
  const trending = await getTrendingData();

  return (
    <main className='bg-black/90'>
      <div className='relative h-full'>
        <Navbar />
        <div className='relative'>
          <Carousel trending={trending} />
        </div>
        <div className='relative pb-7 w-full md:w-[1200px] mx-auto'>
          <Section movies={movies} />
          <Film />
          <RecommendedSection />
          <div className='mt-20 w-full'>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
