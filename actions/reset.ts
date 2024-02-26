"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { ResetSchema } from "@/helpers/schemas";
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedField = ResetSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "This email is not registered" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Reset email sent!" };
};
