"use client";
import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/helpers/schemas";
import { useSearchParams } from "next/navigation";
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
import { login } from "@/actions/login";
import FormError from "@/components/FormError";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import FormSuccess from "@/components/FormSuccess";

const Login = () => {
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This Email was used by a different sign in service"
      : "";
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
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
    <div className='fixed inset-0  z-[300] bg-white  text-black grid grid-cols-1 md:grid-cols-2  '>
      <div className='relative w-full md:w-full mx-auto flex md:px-28 flex-col justify-center'>
        <div className='absolute top-4 left-2  md:top-5 md:left-5'>
          <BackButton />
        </div>

        <div>
          <p className=' text-2xl text-center font-black text-red-500'>
            FlickFiesta
          </p>
        </div>

        <div className='text-center flex flex-col gap-2 mt-10'>
          <h5 className='text-3xl font-bold'>Welcome Back</h5>
          <p className='text-sm text-neutral-500'>Please enter your details</p>
        </div>

        <div className='mt-10 mb-0 w-[80vw] mx-auto md:w-full'>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
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
                      <p className='text-[11px] font-medium'>Remember me</p>
                    </div>
                    <Link
                      href='/auth/forgot'
                      className='text-[11px] font-medium text-blue-700'>
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button
                className='w-full md:py-6'
                type='submit'
                disabled={isPending}>
                Login
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
          type='button'
          onClick={() => onClick("google")}>
          <Image
            width={20}
            height={20}
            src='/images/icons/google.png'
            alt='google logo'
            className='object-cover'
          />
          Sign in with Google
        </Button>

        <p className='text-[11px] md:text-[13px] font-medium text-center mt-8'>
          Don&apos;t have an account?
          <span>
            <Link href='/auth/register' className='font-bold'>
              {" "}
              Sign up
            </Link>
          </span>
        </p>
      </div>
      <div className='bg-black/40 hidden md:flex'></div>
    </div>
  );
};

export default Login;
