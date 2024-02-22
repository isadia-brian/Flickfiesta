import BackButton from "@/components/BackButton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

const Error = () => {
  return (
    <div className='h-screen bg-neutral-600 flex justify-center items-center'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardDescription>Oops! Something went wrong!</CardDescription>
        </CardHeader>
        <CardFooter>
          <BackButton />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Error;
