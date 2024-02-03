import * as React from "react";

import Navbar from "@/components/Navbar";

import Carousel from "@/components/Carousel";

import Movie from "@/components/Movie";
import Section from "@/components/Section";
import RecommendedSection from "@/components/RecommendedSection";

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

  return (
    <main>
      <div className='relative h-full'>
        <Navbar />
        <div className='relative'>
          <Carousel movies={movies} />
        </div>
        <div className='relative bg-black/90 pb-20 '>
          <Section movies={movies} />
          <Movie />
          <RecommendedSection />
        </div>
      </div>
    </main>
  );
}
