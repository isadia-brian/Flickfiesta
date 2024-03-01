"use client";

import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton } from "./CarouselDots";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "./ui/button";
import { Bookmark, Play } from "lucide-react";

interface TrendingItem {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  link: string;
}

type PropType = {
  trending: TrendingItem[];
};

const Carousel: React.FC<PropType> = (props) => {
  const { trending } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    AutoPlay({ delay: 6000 }),
  ]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className='embla relative'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {trending?.map((item, index) => (
            <div className='embla__slide' key={index}>
              <div className='absolute h-full w-full z-50 flex flex-col gap-7 text-white justify-center  px-4 lg:ml-4 lg:px-0'>
                <h3 className='font-black text-3xl md:text-4xl lg:text-6xl md:max-w-[600px]'>
                  {item.title}
                </h3>
                <p className='text-[12px] md:text-sm md:w-[500px] line-clamp-4'>
                  {item.overview}
                </p>
                <div className='flex items-center gap-3 px-2'>
                  <Link
                    href={{ pathname: item.link, query: { id: item.id } }}
                    className='flex items-center justify-center whitespace-nowrap md:w-[150px] h-9 px-4 rounded-none gap-2  py-6 bg-gradient-to-r from-orange-500 to-red-500 -skew-x-[30deg] text-sm font-medium transition-colors gradient element-to-rotate'>
                    <Play className='h-4 w-4 skew-x-[30deg]' fill='white' />
                    <span className='skew-x-[30deg]'>WATCH NOW</span>
                  </Link>

                  <Button className='flex items-center md:w-[150px] gap-2  py-6 bg-white/50 backdrop-filter backdrop-blur-sm -skew-x-[30deg] rounded-none text-black hover:bg-black hover:text-white'>
                    <Bookmark
                      className='h-4 w-4 skew-x-[30deg]'
                      strokeWidth={3}
                    />
                    <span className='skew-x-[30deg]'>BOOKMARK</span>
                  </Button>
                </div>
              </div>
              <div className='h-full w-full absolute top-0 left-0  bg-gradient-to-r from-black/70 z-30' />
              <div className='absolute top-0 left-0 h-full w-full z-20'>
                <div className='relative h-full w-full'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                    fill
                    alt={item.title}
                    className='object-cover'
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='embla__dots'>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={"embla__dot".concat(
              index === selectedIndex
                ? " embla__dot--selected text-red-500"
                : ""
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
