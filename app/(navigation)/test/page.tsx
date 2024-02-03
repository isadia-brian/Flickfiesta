"use client";

import { Suspense, useEffect, useState } from "react";

import FancyModal from "@/components/FancyModal";

import TVCard from "@/components/TVCard";
import { Search } from "lucide-react";

const Page = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenModal = async () => {
    setDisabled(false);
    setShow(true);
    const url = `https://api.themoviedb.org/3/search/tv?query=${search}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
    const res = await fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.results));
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
    <div className='relative mt-24 max-w-[1200px] mx-auto'>
      <div className='absolute z-50 flex items-center gap-3'>
        <div className=' px-3 py-2 flex items-center w-[300px] gap-3 rounded-md bg-zinc-600'>
          <Search className='h-5 w-5' stroke='gray' />
          <input
            type='text'
            placeholder='Filter by name...'
            value={search}
            onChange={handleSearch}
            className='text-sm outline-none w-full bg-inherit cursor-pointer '
          />
        </div>
        <button
          type='button'
          onClick={handleOpenModal}
          className={`border-none  px-4 py-2 text-white rounded-full flex items-center justify-center ${
            disabled
              ? "bg-zinc-500 cursor-not-allowed"
              : "bg-black cursor-pointer"
          }`}
          disabled={disabled}>
          Open
        </button>
      </div>

      <FancyModal show={show} handleClose={hideModal}>
        <p className='text-[20px] font-bold mb-8'>Results</p>
        <div>
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
            {data?.length <= 0 ? (
              <>
                <p>No Results Found</p>
              </>
            ) : (
              <div className='grid grid-cols-6 gap-y-8'>
                {data?.map((tv, index) => (
                  <TVCard tv={tv} key={index} hover={false} dark={true} />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </FancyModal>
    </div>
  );
};

export default Page;
