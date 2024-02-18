"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import { Search, X } from "lucide-react";
import { searchFilm } from "@/helpers";
import { ScrollArea } from "./ui/scroll-area";
import FilmCard from "./FilmCard";
import { Button } from "./ui/button";

const SearchFilm = ({ toggleHidden }) => {
  const buttons = [
    {
      title: "Movies",
    },
    {
      title: "Series",
    },
  ];
  const [media, setMedia] = useState("movie");
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [placeholder, setPlaceholder] = useState("Search Movies...");
  const [disabled, setDisabled] = useState(true);

  const handleToggle = (index: number) => {
    setActiveButtonIndex(index);

    if (index === 0) {
      setMedia("movie");

      setPlaceholder("Search Movies...");
    } else if (index === 1) {
      setMedia("tv");

      setPlaceholder("Search Series...");
    }
  };

  const handleDisabledButton = () => {
    if (searchValue.trim() === "") {
      setSearchValue("");
      setDisabled(true);
      setSearchResults([]);
    } else {
      setDisabled(false);
    }
  };

  const handleSearchClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const films = await searchFilm(media, searchValue);
    setSearchResults(films);
  };

  useEffect(() => {
    handleDisabledButton();
  }, [searchValue]);

  return (
    <div className='fixed inset-0 z-[100] backdrop-blur-sm  bg-black/30 flex justify-center items-center'>
      <div className='relative shadow-2xl bg-white md:w-[1200px] mx-auto h-[70%] overflow-y-auto rounded-lg  py-4'>
        <div
          className='group absolute top-2 right-2 border-2 border-white transition duration-100 ease-in-out hover:border-red-600 rounded-full p-1 cursor-pointer'
          onClick={toggleHidden}>
          <X className='h-5 w-5 group-hover:text-red-600' />
        </div>
        <div className='w-full flex items-center justify-center pb-4'>
          <div className='bg-neutral-200 flex items-center justify-center rounded-full w-max '>
            {buttons.map(({ title }, index) => (
              <button
                key={index}
                className={`rounded-full px-4 py-2 ${
                  index === activeButtonIndex
                    ? "gradient element-to-rotate"
                    : ""
                }`}
                onClick={() => handleToggle(index)}>
                {title}
              </button>
            ))}
          </div>
        </div>

        <form className='py-2 px-4 border-b-[0.5px] border-slate-300 w-full flex items-center gap-4'>
          <div className=' px-3 py-2 flex items-center md:w-[300px] gap-3 rounded-md bg-neutral-200'>
            <Search className='h-5 w-5' stroke='gray' />
            <input
              type='text'
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='text-sm outline-none w-full bg-inherit cursor-pointer text-black/90 '
            />
          </div>
          <Button
            onClick={handleSearchClicked}
            type='submit'
            disabled={disabled}
            className={`flex items-center justify-center w-[100px] h-[35px] ${
              disabled
                ? "bg-zinc-500 "
                : "bg-gradient-to-r from-orange-500 to-red-500 cursor-pointer"
            }`}>
            Search
          </Button>
        </form>

        <div className='px-4 mt-6'>
          <p className='font-bold text-zinc-600'>Results</p>
        </div>

        <div className='relative px-4'>
          <ScrollArea className=' w-full h-full'>
            {searchResults?.length <= 0 ? (
              <p className='text-black'>No results</p>
            ) : (
              <ul className='grid grid-cols-6 gap-y-8 gap-x-4 py-6'>
                {searchResults?.map((film, index) => {
                  return (
                    <li key={index} className='relative z-50'>
                      <FilmCard film={film} hover={false} />
                    </li>
                  );
                })}
              </ul>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default SearchFilm;
