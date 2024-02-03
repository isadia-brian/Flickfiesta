const getMovieData = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?include_adult=true&api_key=d8bfacf62ba3f83b7f46230a2fb38e91"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
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
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d8bfacf62ba3f83b7f46230a2fb38e91`
    )
      .then((res) => res.json())
      .then((json) => results.push(json.results));
    return results[0];
  } catch (err) {
    console.error(err);
  }
};
