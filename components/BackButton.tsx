"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div>
      <Button
        className='flex items-center gap-2 bg-inherit text-black/90 hover:bg-inherit ring-0 shadow-none focus:ring-0'
        onClick={handleBack}>
        <MoveLeft className='h-5 w-5' />
        <p className='hidden md:flex'>Back</p>
      </Button>
    </div>
  );
};

export default BackButton;
