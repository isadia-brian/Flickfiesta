"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubscribeSchema } from "@/helpers/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribe } from "@/actions/subscribe";

const links = [
  {
    title: "About",
    link: "#",
  },

  {
    title: "FAQs",
    link: "#",
  },
  {
    title: "Contact",
    link: "#",
  },
];

const Footer = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SubscribeSchema>>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SubscribeSchema>) => {
    startTransition(() => {
      subscribe(values).then((data) => {});
    });
  };
  return (
    <div className='text-white relative py-10'>
      <div className='flex flex-col items-center '>
        <div className='mb-4 md:mb-8'>
          <p className='text-[20px] font-black md:text-2xl'>FilmSasa</p>
        </div>
        <div className='flex items-center justify-between mb-10 lg:mb-12 w-[220px] md:w-[320px]'>
          {links.map(({ title, link }, index) => (
            <Link
              href={link}
              key={index}
              className='text-sm md:text-md cursor-pointer underline underline-offset-2'>
              {title}
            </Link>
          ))}
        </div>
        <div>
          <h5 className='font-bold text-center mb-1 md:mb-2 md:text-xl'>
            Subscribe to our newsletter
          </h5>
          <p className='text-sm text-center mb-5'>
            Get notified on the latest news and changes in our site
          </p>
          <Form {...form}>
            <form
              className='relative border border-slate-300 mb-12  w-full rounded-md flex items-center'
              onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='flex-1 outline-none'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Enter your email address'
                        type='email'
                        disabled={isPending}
                        className='bg-transparent outline-none border-none focus-visible:ring-0 placeholder:text-slate-400'
                      />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5' />
                  </FormItem>
                )}
              />

              <button
                type='submit'
                disabled={isPending}
                className='bg-slate-200 h-full px-3 py-3  text-black font-medium'>
                SUBSCRIBE
              </button>
            </form>
          </Form>
        </div>
      </div>
      <div className='w-full flex items-center justify-center'>
        <p className='text-xs'>
          Developed by Isadia <span>&copy; 2024</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
