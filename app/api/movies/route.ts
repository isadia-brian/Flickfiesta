import { NextResponse, type NextRequest } from "next/server";

interface FilmItem {
  title?: string;
  poster_path: string;
  id: number;
  link: string;
  year: number;
  rating: number;
}

export async function GET(request: NextRequest) {
  let results: any[] = [];
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;

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

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Fetching Data", error },
      { status: 503 }
    );
  }
}
