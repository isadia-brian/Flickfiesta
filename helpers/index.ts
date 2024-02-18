export const getTrendingData = async () => {
  let results = [];
  try {
    const url = `https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;

    const response = await fetch(url)
      .then((res) => res.json())
      .then((json) => json.results);

    const trending = response.slice(0, 6);

    const modifiedTrending = trending.map((item) => {
      let link;
      switch (item.media_type) {
        case "tv":
          link = `/series/serie`;
          break;

        case "movie":
          link = `/movies/movie`;
          break;

        default:
          break;
      }

      return {
        title: item.title || item.name,
        backdrop_path: item.backdrop_path,
        link: link,
        id: item.id,
        overview: item.overview,
      };
    });

    results.push(...modifiedTrending);
    results.sort(() => Math.random() - 0.9);

    return results;
  } catch (error) {
    console.error("error:", error);
  }
};

//

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
  let results: any[] = [];
  let pages: number;
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&primary_release_date.gte=2023-01-01&release_date.gte=2023-01-01&sort_by=popularity.desc&vote_count.gte=6&with_genres=16&with_original_language=en&without_genres=37%2C10752%2C53%2C10770%2C878%2C10749%2C9648%2C27%2C36%2C99%2C80&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    const response = await fetch(url).then((res) => res.json());
    pages = 10;
    const animations = response.results;
    pages = response.total_pages;
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

    return {
      pages,
      results,
    };
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
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    const response = await fetch(url).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
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
    const topMovies = movies.slice(0, 2);

    const moviesWithLinks = topMovies?.map((movie) => {
      return {
        ...movie,
        link: `/movies/movie`,
      };
    });
    results.push(...moviesWithLinks);

    //series
    const series = await fetch(
      `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&page=1&language=en-US&with_origin_country=US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.results);
    const topShows = series.slice(0, 3);
    const showsWithLinks = topShows?.map((show) => {
      return {
        ...show,
        link: `/series/serie`,
      };
    });

    results.push(...showsWithLinks);

    results.sort(() => Math.random() - 0.5);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularFilm = async () => {
  let results: any[] = [];

  try {
    //getPopularMovies
    const movies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?include_adult=true&include_video=true&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.results);
    const topMovies = movies.slice(0, 6);

    const moviesWithLinks = topMovies?.map((movie) => {
      const convertedYear = Number(movie.release_date.substring(0, 4));

      return {
        ...movie,
        link: `/movies/movie`,
        media: "Movie",
        year: convertedYear,
        filterCategory: "Popular",
      };
    });

    results.push(...moviesWithLinks);

    //series
    const shows = await fetch(
      `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=2022-01-01&language=en-US&vote_count.gte=100&watch_region=US&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.results);
    const topShows = shows.slice(0, 12);

    const showsWithLinks = topShows?.map((show) => {
      const convertedYear = Number(show.first_air_date.substring(0, 4));
      return {
        ...show,
        link: `/series/serie`,
        media: "TV",
        year: convertedYear,
        filterCategory: "Popular",
      };
    });

    results.push(...showsWithLinks);
    return results;
  } catch (error) {
    console.error("error", error);
  }
};

export const getTrendingFilm = async () => {
  let results = [];
  try {
    //getTrendingFilm
    const url = `https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;

    const response = await fetch(url)
      .then((res) => res.json())
      .then((json) => json.results);

    const trending = response.slice(0, 12);

    const modifiedTrending = trending.map((item) => {
      const returnedYear = item.first_air_date || item.release_date;
      const year = Number(returnedYear.substring(0, 4));

      let link;
      switch (item.media_type) {
        case "tv":
          link = `/series/serie`;
          break;

        case "movie":
          link = `/movies/movie`;
          break;

        default:
          break;
      }

      return {
        title: item.title || item.name,
        backdrop_path: item.backdrop_path,
        link: link,
        id: item.id,
        overview: item.overview,
        poster_path: item.poster_path,
        year: year,
        vote_average: item.vote_average,
        filterCategory: "Trending",
      };
    });

    results.push(...modifiedTrending);

    //getPopularFilm

    const popularFilm = await getPopularFilm();
    const modifiedPopular = popularFilm.map((item) => {
      return {
        title: item.title || item.name,
        backdrop_path: item.backdrop_path,
        link: item.link,
        id: item.id,
        overview: item.overview,
        poster_path: item.poster_path,
        year: item.year,
        vote_average: item.vote_average,
        filterCategory: item.filterCategory,
      };
    });

    results.push(...modifiedPopular);
    return results;
  } catch (error) {
    console.error("error:", error);
  }
};

export const searchFilm = async (media: string, query: string) => {
  let url: string = "";
  let results = [];
  let link: string;

  if (!media && !query) {
    return null;
  } else if (media === "movie") {
    url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    link = "/movies/movie";
  } else if (media === "tv") {
    url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    link = "/series/serie";
  }

  try {
    const response = await fetch(url)
      .then((res) => res.json())
      .then((json) => json.results);

    const data = response;
    const modifiedData = data.map((item) => {
      console.log(item);

      const returnedYear = item.first_air_date || item.release_date;

      const year = Number(returnedYear?.substring(0, 4));

      return {
        title: item.title || item.name,
        link: link,
        id: item.id,
        overview: item.overview,
        poster_path: item.poster_path,
        year: year,
        rating: Math.round(item.vote_average),
      };
    });

    results.push(...modifiedData);

    return results;
  } catch (error) {
    console.error("error:", error);
  }
};
