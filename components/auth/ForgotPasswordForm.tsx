"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ForgotPasswordSchema } from "@/helpers/schemas";
import { forgotPassword } from "@/actions/forgot-password";
import Link from "next/link";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [passwordType, setPasswordType] = useState<string>("password");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleShowClicked = () => {
    setShow(true);
    setPasswordType("text");
  };

  const handleHideClicked = () => {
    setShow(false);
    setPasswordType("password");
  };

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      forgotPassword(values).then((data) => {
        console.log(values);
      });
    });
  };

  return (
    <div>
      <Card className='w-[400px]'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl font-black'>Reset Password</CardTitle>
          <CardDescription>
            Fill in the details to reset password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='space-y-3 md:space-y-6'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='space-y-0'>
                      <FormLabel>Email</FormLabel>
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

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='space-y-0'>
                      <FormLabel>Password</FormLabel>
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
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className='w-full flex items-center justify-between'>
                <Button variant='outline' asChild>
                  <Link href='/auth/login'>Cancel</Link>
                </Button>
                <Button type='submit' disabled={isPending}>
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
