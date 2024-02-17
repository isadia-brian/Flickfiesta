"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import UserAvatar from "./UserAvatar";
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
    title: "Kids",
    link: "/kids",
  },
];

const MobileNav = ({ handleClick }) => {
  const pathname = usePathname();
  return (
    <div className='relative h-screen w-full'>
      <div className='absolute h-screen w-full left-0 bg-black/90 px-8 py-7 z-[100]'>
        <div className='flex items-center justify-between'>
          <p className='text-[22px] font-bold text-red-500'>FlickFiesta</p>

          <Button
            variant='outline'
            size='icon'
            className='rounded-full h-6 w-6 border-none '
            onClick={handleClick}>
            <X className='h-7 w-7' stroke='white' />
          </Button>
        </div>

        <div className='py-28 h-full flex flex-col'>
          <ul className='flex flex-col gap-16'>
            {Links.map(({ title, link }, idx) => (
              <li key={idx} className='relative'>
                <Link
                  href={link}
                  className='text-white text-6xl font-black'
                  onClick={handleClick}>
                  {title}
                </Link>
                {pathname === link && (
                  <span
                    className={`h-[6px] bg-red-500 absolute -bottom-3 w-24 duration-300  left-0 -skew-x-[30deg] `}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
