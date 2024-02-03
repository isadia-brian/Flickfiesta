"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlignLeft, ChevronDown, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import UserAvatar from "./UserAvatar";
import MobileNav from "./MobileNav";

import Link from "next/link";
const Links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Movies",
    link: "/movies",
  },
  {
    title: "Series",
    link: "/series",
  },
  {
    title: "Anime",
    link: "/favourites",
  },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setIsScrolled] = useState(false);
  const [searchPressed, setSearchPressed] = useState(false);

  const pathName = usePathname();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchPressed = () => {
    setSearchPressed(!searchPressed);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 5;
      setIsScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`bg-white`}>
      {isOpen ? (
        <div className='md:hidden'>
          <MobileNav handleClick={handleClick} />
        </div>
      ) : (
        <div>
          <div className='flex items-center justify-between py-5 px-4 md:hidden'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full '
              onClick={() => setIsOpen(true)}>
              <AlignLeft className='h-7 w-7' />
            </Button>
            <p className='text-xl font-bold text-red-500'>PlayFlix</p>
            <UserAvatar />
          </div>
          <div
            className={`w-full transition-colors duration-150 fixed top-0 z-50 py-3 hidden md:flex md:px-10 lg:px-0 ${
              scrolled ? "bg-white text-black" : "text-white"
            }`}>
            <nav className='flex items-center justify-between w-[1200px] mx-auto'>
              <div>
                <Link href='/' className='text-xl font-bold text-red-500'>
                  PlayFlix
                </Link>
              </div>

              <div
                className={` py-4  rounded-full flex items-center justify-between relative ${
                  scrolled ? "bg-black text-white" : "bg-white/85 text-black"
                } ${searchPressed ? "min-w-[400px]" : ""}`}>
                <nav>
                  <ul
                    className={`items-center gap-12 ${
                      searchPressed ? "hidden" : "flex px-9"
                    } `}>
                    {Links.map(({ title, link }, index) => (
                      <li
                        key={index}
                        className='cursor-pointer text-xs font-medium flex flex-col items-center gap-1'>
                        <Link href={link}>{title}</Link>
                        {pathName === link && (
                          <div
                            className={`h-[2px] bg-red-500 rounded-full absolute bottom-0 w-6 transition-width duration-300 ease-in-out `}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div
                  className={`flex items-center justify-between w-full  px-4 `}>
                  <input
                    type='text'
                    placeholder='Search Movies or TV Shows'
                    className={`outline-none bg-transparent text-xs  flex-1 ${
                      searchPressed ? "flex" : "hidden"
                    }`}
                  />
                  {searchPressed ? (
                    <X
                      className='h-4 w-4 cursor-pointer'
                      onClick={handleSearchPressed}
                    />
                  ) : (
                    <div
                      className={`absolute top-1/2 -translate-y-1/2  px-3 py-3 rounded-full right-1 cursor-pointer ${
                        scrolled ? "bg-white text-black" : "bg-black text-white"
                      }`}
                      onClick={handleSearchPressed}>
                      <Search className='h-4 w-4 ' />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className='flex items-center'>
                  <UserAvatar />
                  <ChevronDown className='h-3 w-3' fill='white' />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
