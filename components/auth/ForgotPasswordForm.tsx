"use client";

import { useCallback, useEffect, useState } from "react";
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
import Link from "next/link";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";

const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div>
      <Card className='w-[400px] flex flex-col items-center'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl font-black'>Reset Password</CardTitle>
          <CardDescription className='text-center'>
            Fill in the details to reset password
          </CardDescription>
        </CardHeader>
        <CardContent className='w-full flex flex-col items-center space-y-6'>
          {!success && !error && <BeatLoader />}

          <FormSuccess message={success} />

          {!success && <FormError message={error} />}
        </CardContent>
        <CardFooter>
          <Link href='/auth/login'>Back to login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
