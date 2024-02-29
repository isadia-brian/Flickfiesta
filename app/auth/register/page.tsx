"use client";
import { useState, useTransition } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/helpers/schemas";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

const Register = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [passwordType, setPasswordType] = useState<string>("password");

  const handleShowClicked = () => {
    setShow(true);
    setPasswordType("text");
  };

  const handleHideClicked = () => {
    setShow(false);
    setPasswordType("password");
  };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className='fixed inset-0  z-[300] bg-white  text-black grid grid-cols-1 md:grid-cols-2'>
      <div className='bg-black/40 hidden md:flex'></div>
      <div className='relative w-full md:w-full mx-auto flex md:px-28 flex-col justify-center'>
        <div className='absolute top-4 left-2  md:top-5 md:left-5'>
          <BackButton />
        </div>

        <div>
          <p className=' text-2xl text-center font-black text-red-500'>
            FlickFiesta
          </p>
        </div>

        <div className='text-center flex flex-col gap-2 mt-8'>
          <h5 className='text-3xl font-bold'>Create an Account</h5>
          <p className='text-sm text-neutral-500'>Please enter your details</p>
        </div>

        <div className='mt-6 mb-0 w-[80vw] mx-auto md:w-full'>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='space-y-3 md:space-y-6'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem className='space-y-0'>
                      <FormLabel className='text-xs md:text-sm text-left font-medium'>
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Ex:johndoe'
                          type='text'
                          disabled={isPending}
                          className='placeholder:text-xs md:py-6'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          placeholder='Ex:john@example.com'
                          type='email'
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
                  <div className=' flex '>
                    <div className='flex items-center gap-1'>
                      <input
                        type='checkbox'
                        className=' border border-neutral-300'
                      />
                      <p className='text-[11px] font-medium'>
                        I accept the{" "}
                        <span>
                          <Link
                            href='/'
                            className='underline underline-offset-2 decoration-red-500 font-bold'>
                            Privacy Terms
                          </Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                className='w-full md:py-6'
                type='submit'
                disabled={isPending}>
                Register
              </Button>
            </form>
          </Form>
        </div>
        <div className='flex w-[80vw] mx-auto md:w-full items-center space-x-1 my-5'>
          <div className='h-[0.5px] bg-neutral-300 w-full' />
          <p className='text-neutral-700 text-xs'>OR</p>
          <div className='h-[0.5px] bg-neutral-300 w-full' />
        </div>
        <Button
          className='w-[80vw] md:w-full mx-auto  bg-transparent border border-neutral-300 text-neutral-900 flex items-center justify-center gap-2 shadow-none md:py-6 hover:bg-transparent'
          type='button'>
          <Image
            width={20}
            height={20}
            src='/images/icons/google.png'
            alt='google logo'
            className='object-cover'
          />
          Sign up with Google
        </Button>

        <p className='text-[11px] md:text-[13px] font-medium text-center mt-8'>
          Already a member?
          <span>
            <Link href='/auth/login' className='font-bold'>
              {" "}
              Sign in
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
