"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Search, ChevronDown, Filter as FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import FancyModal from "./FancyModal";
import { Button } from "./ui/button";
import TVCard from "./TVCard";
import MovieCard from "./MovieCard";

type PropType = {
  media: string;
};

const Filter: React.FC<PropType> = (props) => {
  const { media } = props;

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const [show, setShow] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenModal = async () => {
    setDisabled(false);
    setShow(true);
    let url = "";

    if (!media) {
      return null;
    }

    try {
      url = `https://api.themoviedb.org/3/search/${media}?query=${search}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
      const res = await fetch(url)
        .then((res) => res.json())
        .then((json) => setData(json.results));
    } catch (error) {
      throw new Error("Error Fetching Data");
    }
  };

  const hideModal = () => {
    setData([]);
    setShow(false);
  };

  useEffect(() => {
    const handleSearchChange = () => {
      if (search.trim() === "") {
        hideModal();
        setData([]);
        setDisabled(true);
        return;
      }

      setDisabled(false);
    };
    handleSearchChange();
  }, [search]);

  return (
    <div className='relative '>
      <div className='relative w-full border-b-[0.2px] border-zinc-700 pb-3 '>
        <div className='flex items-center gap-4'>
          <div className=' px-3 py-2 flex items-center md:w-[300px] gap-3 rounded-md bg-zinc-600'>
            <Search className='h-5 w-5' stroke='gray' />
            <input
              type='text'
              placeholder='Search by name...'
              value={search}
              onChange={handleSearch}
              className='text-sm outline-none w-full bg-inherit cursor-pointer text-white/90 '
            />
          </div>

          <Button
            onClick={handleOpenModal}
            disabled={disabled}
            className={`flex items-center justify-center w-[100px] h-[35px] ${
              disabled
                ? "bg-zinc-500 "
                : "bg-gradient-to-r from-orange-500 to-red-500 cursor-pointer"
            }`}>
            Search
          </Button>
        </div>
        <FancyModal show={show} handleClose={hideModal}>
          <p className='text-[20px] font-bold mb-8'>Results</p>
          <div>
            <Suspense
              fallback={
                <p style={{ textAlign: "center", color: "black" }}>
                  Loading...
                </p>
              }>
              {data?.length <= 0 ? (
                <>
                  <p>No Results Found</p>
                </>
              ) : (
                <div className='w-full'>
                  {media === "tv" ? (
                    <div className='grid grid-cols-2 md:grid-cols-6 gap-y-8 gap-x-4'>
                      {data?.map((tv, index) => (
                        <div key={index}>
                          <TVCard tv={tv} hover={false} dark={true} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='grid grid-cols-2 md:grid-cols-6 gap-y-8 gap-x-4'>
                      {data?.map((movie, index) => (
                        <div key={index}>
                          <MovieCard movie={movie} hover={false} dark={true} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Suspense>
          </div>
        </FancyModal>
      </div>
      <div className='w-full border-b-[0.5px] border-zinc-700 py-3 pb-5 flex flex-wrap items-center gap-x-4 gap-y-5 md:gap-3 '>
        <div className='flex flex-col md:max-w-[150px] '>
          <p className='font-semibold text-sm text-white'>Year</p>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-zinc-600 px-3 py-1  text-gray-400 flex justify-between items-center w-[100px] md:w-[130px] rounded-md'>
              Any
              <ChevronDown className='h-4 w-4' />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className='flex flex-col max-w-[150px] '>
          <p className='font-semibold text-sm text-white'>Country</p>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-zinc-600 px-3 py-1  text-gray-400 flex justify-between items-center w-[100px] md:w-[130px] rounded-md'>
              Any
              <ChevronDown className='h-4 w-4' />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className='flex flex-col max-w-[150px] '>
          <p className='font-semibold text-sm text-white'>Genre</p>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-zinc-600 px-3 py-1  text-gray-400 flex justify-between items-center w-[100px] md:w-[130px] rounded-md'>
              Any
              <ChevronDown className='h-4 w-4' />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className='flex flex-col max-w-[150px] '>
          <p className='font-semibold text-sm text-white'>Rating</p>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-zinc-600 px-3 py-1  text-gray-400 flex justify-between items-center w-[100px] md:w-[130px] rounded-md'>
              Any
              <ChevronDown className='h-4 w-4' />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className='flex flex-col max-w-[150px] '>
          <p className='font-semibold text-sm text-white'>Quality</p>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-zinc-600 px-3 py-1  text-gray-400 flex justify-between items-center w-[100px] md:w-[130px] rounded-md'>
              Any
              <ChevronDown className='h-4 w-4' />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className='flex flex-col max-w-[220px] '>
          <p className='font-semibold text-sm text-white'>Sort By</p>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-zinc-600 px-3 py-1  text-gray-400 flex justify-between items-center w-[200px] md:w-[200px] rounded-md'>
              Recently Updated
              <ChevronDown className='h-4 w-4' />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className='flex flex-col max-w-[220px] '>
          <p className='font-semibold text-sm invisible'>Sort By</p>
          <Button className='flex items-center justify-between w-[100px] bg-gradient-to-r from-orange-500 to-red-500  h-[32px]'>
            <FilterIcon className='h-3 w-4' />
            <p>Filter</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
