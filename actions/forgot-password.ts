"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { ForgotPasswordSchema } from "@/helpers/schemas";
import { getUserByEmail } from "@/data/user";

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {};
