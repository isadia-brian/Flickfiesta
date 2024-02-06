import Image from "next/image";
import { Heart, Star, Eye } from "lucide-react";

const TrialCard = (props) => {
  const { film } = props;
  const title = film.name || film.title;
  const image = film.poster_path;

  const filmYear = film?.first_air_date || film?.release_date;

  const year = filmYear?.substring(0, 4);
  const vote_average = Math.round(film.vote_average);
  const dark = true;
  return (
    <div className='relative flex flex-col gap-2 cursor-pointer'>
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
              dark ? "text-black" : "text-gray-300/80"
            }`}>
            {year}
          </p>
          <div className='flex items-center gap-3'>
            <Heart className='h-[13px] w-[13px]' />
            <Eye className='h-[13px] w-[13px]' />
            <div className='flex items-center gap-1'>
              <Star className='h-[13px] w-[13px]' />
              <p className='text-[11px] leading-4 text-black'>{vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialCard;
