"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  TrendingUp,
  Heart,
  Flame,
  AlignHorizontalJustifyStart,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Eye,
  X,
} from "lucide-react";

import FilmCard from "./FilmCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/helpers/schemas";
import { login } from "@/actions/login";
import Link from "next/link";

const headerButtons = [
  {
    title: "Trending",
    link: "",
    icon: <TrendingUp className='h-4 w-4' />,
  },
  {
    title: "Watching",
    link: "",
    icon: <AlignHorizontalJustifyStart className='h-4 w-4' />,
  },
  {
    title: "Popular",
    link: "",
    icon: <Flame className='h-4 w-4' />,
  },
  {
    title: "Favourites",
    link: "",
    icon: <Heart className='h-4 w-4' fill='#111' />,
  },
];

interface DataItem {
  media: "Movie" | "TV";
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  id: number;
  link: string;
  year: number;
  filterCategory: "Trending" | "Popular" | "";
}

type PropType = {
  trendingFilm: DataItem[];
};

const useFilter = (data: DataItem[], filter: string) => {
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);

  useEffect(() => {
    // If the filter is "Trending" return the original data

    if (filter === "Trending") {
      setFilteredData(data.filter((item) => item.filterCategory === filter));
    } else if (filter === "Popular") {
      //Other wise filter the data by type
      setFilteredData(data.filter((item) => item.filterCategory === filter));
    } else if (filter === "") {
      setFilteredData(data.filter((item) => item.filterCategory === ""));
    }
  }, [data, filter]); //Update filtered data when the data or filter changes

  return filteredData;
};

const Section: React.FC<PropType> = (props) => {
  const session = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [passwordType, setPasswordType] = useState<string>("password");
  const { trendingFilm } = props;
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [filter, setFilter] = useState<string>("Trending");
  const [data, setData] = useState<DataItem[]>(trendingFilm);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  // The filtered data that is returned by the custom hook
  const filteredData = useFilter(data, filter);

  const watchingFilterClicked = () => {
    if (session.status === "unauthenticated") {
      setShowLogin(true);
      setFilter("");
    }
  };

  const handleFilter = (index: number) => {
    setActiveButtonIndex(index);

    switch (index) {
      case 0:
        setFilter("Trending");
        break;
      case 1:
        watchingFilterClicked();
        break;
      case 2:
        setFilter("Popular");
        break;
      case 3:
        watchingFilterClicked();
        break;

      default:
        break;
    }
  };

  const scrollContainerRef = useRef(null);

  const scrollContainer = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 450; // Adjust the scroll amount as needed
      const scrollPosition = container.scrollLeft + direction * scrollAmount;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleShowClicked = () => {
    setShow(true);
    setPasswordType("text");
  };

  const handleHideClicked = () => {
    setShow(false);
    setPasswordType("password");
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className=' text-white mb-8 relative px-5 md:px-0  w-full'>
      {showLogin && (
        <div className='fixed inset-0 z-[1000] overflow-hidden backdrop-blur-sm  bg-black/30 flex justify-center items-center'>
          <Card className='w-[500px]'>
            <CardHeader>
              <CardTitle className=' text-2xl font-black flex justify-between'>
                <p>You are not Logged in</p>

                <Button size='icon' onClick={() => setShowLogin(false)}>
                  <X className='h-5 w-5' />
                </Button>
              </CardTitle>
              <CardDescription>
                Kindly Login to be able to access this section
              </CardDescription>
            </CardHeader>
            <CardContent className='mt-4'>
              <Button className='w-full bg-inherit border border-neutral-200 py-6 space-x-4 rounded-full hover:bg-inherit'>
                <Image
                  width={20}
                  height={20}
                  src='/images/icons/google.png'
                  alt='google logo'
                  className='object-cover'
                />
                <p className='text-neutral-700'>Sign in With Google</p>
              </Button>
              <div className='flex w-[80vw] mx-auto md:w-full items-center my-5'>
                <div className='h-[0.5px] bg-neutral-300 w-full' />
                <p className='text-neutral-700 w-full  flex items-center justify-center text-xs'>
                  or sign in with email
                </p>
                <div className='h-[0.5px] bg-neutral-300 w-full' />
              </div>
              <div className='mt-8'>
                <Form {...form}>
                  <form
                    className='space-y-6'
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-3 md:space-y-6'>
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem className='space-y-0'>
                            <FormLabel className='text-xs md:text-sm text-left font-medium'>
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder='Ex:johndoe@example.com'
                                type='text'
                                disabled={isPending}
                                className='placeholder:text-xs md:py-6'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className='space-y-3'>
                        <FormField
                          control={form.control}
                          name='password'
                          render={({ field }) => (
                            <FormItem className='space-y-0'>
                              <FormLabel className='text-xs md:text-sm text-left font-medium'>
                                Password
                              </FormLabel>
                              <FormControl>
                                <div className='relative rounded-md border border-slate-200'>
                                  <Input
                                    {...field}
                                    placeholder='******'
                                    type={passwordType}
                                    disabled={isPending}
                                    className='placeholder:text-xs md:py-6'
                                  />
                                  <div className='absolute top-1/2 -translate-y-1/2 right-2 z-50'>
                                    {!show ? (
                                      <div
                                        className='cursor-pointer'
                                        onClick={handleShowClicked}>
                                        <Eye className='h-5 w-5' />
                                      </div>
                                    ) : (
                                      <div
                                        className='cursor-pointer'
                                        onClick={handleHideClicked}>
                                        <EyeOff className='h-5 w-5' />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className=' flex items-center justify-between'>
                          <div className='flex items-center gap-1'>
                            <input
                              type='checkbox'
                              className=' border border-neutral-300'
                            />
                            <p className='text-[11px] font-medium'>
                              Remember me
                            </p>
                          </div>
                          <Link
                            href='/auth/reset'
                            className='text-[11px] font-medium text-blue-700'>
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                      className='w-full md:py-6 rounded-full'
                      type='submit'
                      disabled={isPending}>
                      Login
                    </Button>
                  </form>
                </Form>
              </div>
              <div className='mt-5'>
                <p className='text-[11px] md:text-[13px] font-medium text-center '>
                  Don&apos;t have an account?
                  <span>
                    <Link href='/auth/register' className='font-bold'>
                      {" "}
                      Sign up
                    </Link>
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className='relative pt-8 pb-5 flex items-center gap-10 md:gap-0 justify-between border-b-[0.5px] border-white/20'>
        {headerButtons.map(({ title, icon }, index) => (
          <div
            className='flex items-center gap-2 cursor-pointer  w-full md:w-max '
            onClick={() => handleFilter(index)}
            key={index}>
            <p className='hidden md:inline-block'>{icon}</p>
            <p
              className={`text-[13px] transition-all duration-200 ${
                index === activeButtonIndex
                  ? "md:text-[20px] font-bold"
                  : "text-gray-300/50"
              }`}>
              {title}
            </p>
          </div>
        ))}
      </div>

      <div className='w-full flex justify-end pt-4 '>
        <div className='flex items-center gap-[1px]'>
          <ChevronLeft
            onClick={() => scrollContainer(-1)}
            className='h-6 w-6 text-white/65 hover:text-white transition-colors duration-300 cursor-pointer'
          />
          <ChevronRight
            onClick={() => scrollContainer(+1)}
            className='h-6 w-6 text-white/65 hover:text-white transition-colors duration-300 cursor-pointer'
          />
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className=' flex gap-4 pt-5 pb-4 w-full  overflow-x-scroll no-scrollbar'>
        {filteredData?.map((film, index) => {
          return <FilmCard film={film} dark={true} hover={true} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Section;
