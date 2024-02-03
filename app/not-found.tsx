"use client";

import React from "react";

import { ChevronsLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className='relative h-screen w-screen flex flex-col items-center justify-center'>
      <div className='absolute top-8 left-5'>
        <Link
          href={"/"}
          className='h-9 px-4 py-2 rounded-md transition-colors flex items-center gap-4 bg-transparent text-black shadow-none hover:text-white hover:bg-slate-900/90 hover:shadow-lg'>
          <ChevronsLeft className='h-5 w-5' />
          <span> Back Home</span>
        </Link>
      </div>
      <h1 className='text-[400px] font-black'>404</h1>
      <p className='text-xl'>
        Hmmm... The page you are looking for was not found
      </p>
    </div>
  );
};

export default NotFound;
