const getMovieData = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?include_adult=true&api_key=d8bfacf62ba3f83b7f46230a2fb38e91"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const discoverTV = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&page=${page}&language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    const response = await fetch(url).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
export const discoverMovies = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&language=en-US&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    const response = await fetch(url).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
export const discoverAnimations = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&release_date.gte=2022-10-10&sort_by=popularity.desc&vote_average.gte=7&without_genres=12%2C36%2C37%2C%2018%20%2C53%2C10752%2C80%2C27%2C14%2C99%2C28%2C10749%2C10751%2C35%2C10402%2C878&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    const response = await fetch(url).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getSingleTV = async (id: number) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    const response = await fetch(url).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getSingleMovie = async (id: number) => {
  const returnedMovie = await getMovieData();
  const item = returnedMovie.results;

  const singleMovie = await item.find((movie: any) => movie.id === id);

  return singleMovie;
};

export const getVideoData = async (id: number) => {
  let results: any[] = [];
  try {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => results.push(json.results));
    return results[0];
  } catch (err) {
    console.error(err);
  }
};

export const sortByVoteCount = async () => {
  const results = await discoverAnimations(1);

  return results;
};

export const getRecommendedContent = async () => {
  try {
    let results: any[] = [];

    //movies
    const movies = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&language=en-US&page=1&with_origin_country=US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.results);
    const topFiveMovies = movies.slice(0, 2);
    results.push(...topFiveMovies);

    //series
    const series = await fetch(
      `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&page=1&language=en-US&with_origin_country=US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.results);
    const topFiveShows = series.slice(0, 3);

    results.push(...topFiveShows);

    results.sort(() => Math.random() - 0.5);
    return results;
  } catch (error) {
    console.log(error);
  }
};
