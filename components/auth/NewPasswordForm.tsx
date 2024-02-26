"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";
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
import { NewPasswordSchema } from "@/helpers/schemas";
import { newPassword } from "@/actions/new-password";
import Link from "next/link";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";

const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
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
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div>
      <Card className='w-[400px]'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl font-black'>New Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='space-y-3 md:space-y-6'>
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
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className='w-full flex items-center justify-between'>
                <Button variant='outline' asChild>
                  <Link href='/auth/login'>Cancel</Link>
                </Button>
                <Button type='submit' disabled={isPending}>
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPasswordForm;
