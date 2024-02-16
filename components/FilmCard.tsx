import Image from "next/image";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

const FilmCard = (props) => {
  const { film, dark } = props;
  const title = film.name || film.title;
  const image = film.poster_path;
  const year = film.year;
  const vote_average = Math.round(film.vote_average) || film.rating;
  const filmLink = film.link;

  return (
    <Link
      href={{ pathname: filmLink, query: { id: film.id } }}
      className='relative flex flex-col gap-2 cursor-pointer transition ease-in-out md:hover:scale-110 duration-300 '>
      <div className='relative fill h-[280px] w-[190px] rounded-lg hover:rounded-md'>
        <Image
          src={`https://image.tmdb.org/t/p/w500${image}`}
          fill
          alt={title}
          className='object-cover rounded-lg'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[13px] font-semibold line-clamp-1'>{title}</p>
        <div className='flex items-center justify-between'>
          <p
            className={`text-[11px] leading-4  ${
              dark ? "text-white" : "text-gray-300/80"
            }`}>
            {year}
          </p>
          <div className='flex items-center gap-4'>
            <Heart className='h-[13px] w-[13px]' />

            <div className='flex items-center gap-1'>
              <Star className='h-[13px] w-[13px]' fill='yellow' />
              <p className='text-[11px] leading-4 text-white'>{vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
