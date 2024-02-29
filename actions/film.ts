"use server";

interface FilmItem {
  title?: string;
  poster_path: string;
  id: number;
  link: string;
  year: number;
  rating: number;
}

export async function discoverMovies(page: number) {
  let results: any[] = [];

  try {
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&language=en-US&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;

    const res = await fetch(url).then((res) => res.json());
    const discoveredFilms = res.results;
    let modifiedFilm = discoveredFilms.map((item: any) => {
      const year = Number(item.release_date.substring(0, 4));
      const rating = Math.round(item.vote_average);
      return {
        id: item.id,
        title: item.title,
        poster_path: item.poster_path,
        rating: rating,
        year: year,
        link: "/movies/movie",
      };
    });
    modifiedFilm.sort((a, b) => {
      return b.year - a.year;
    });

    results.push(...modifiedFilm);

    return results;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function discoverSeries(page: number) {
  let results: any[] = [];

  try {
    const url = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&page=${page}&language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;

    const res = await fetch(url).then((res) => res.json());
    const discoveredFilms = res.results;

    let modifiedFilm = discoveredFilms.map((item: any) => {
      const year = Number(item.first_air_date.substring(0, 4));
      const rating = Math.round(item.vote_average);
      return {
        id: item.id,
        title: item.name,
        poster_path: item.poster_path,
        rating: rating,
        year: year,
        link: "/series/serie",
      };
    });
    modifiedFilm.sort((a, b) => {
      return b.year - a.year;
    });

    results.push(...modifiedFilm);

    return results;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const discoverAnimations = async (page: number) => {
  let results: any[] = [];

  try {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&primary_release_date.gte=2023-01-01&release_date.gte=2023-01-01&sort_by=popularity.desc&vote_count.gte=6&with_genres=16&with_original_language=en&without_genres=37%2C10752%2C53%2C10770%2C878%2C10749%2C9648%2C27%2C36%2C99%2C80&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    const response = await fetch(url).then((res) => res.json());

    const animations = response.results;

    let modifiedAnimation = animations.map((item) => {
      const release_date = item.release_date;
      const year = Number(release_date.substring(0, 4));
      const rating = Math.round(item.vote_average);
      return {
        id: item.id,
        title: item.title,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        poster_path: item.poster_path,
        rating: rating,
        year: year,
        link: "/kids/animation",
      };
    });

    modifiedAnimation.sort((a, b) => {
      return b.year - a.year;
    });

    results.push(...modifiedAnimation);

    return results;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
