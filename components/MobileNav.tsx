"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import UserAvatar from "./UserAvatar";

const MobileNav = ({ handleClick }) => {
  return (
    <div className='h-screen w-screen bg-black py-5 px-4'>
      <div className='flex items-center justify-between'>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full '
          onClick={handleClick}>
          <X className='h-7 w-7' />
        </Button>
        <p className='text-xl font-bold text-red-500'>FlickFiesta</p>
        <UserAvatar />
      </div>
    </div>
  );
};

export default MobileNav;
