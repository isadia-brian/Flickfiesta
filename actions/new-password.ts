"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { NewPasswordSchema } from "@/helpers/schemas";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import bycrypt from "bcryptjs";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token" };
  }
  const validatedField = NewPasswordSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedField.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "The reset token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bycrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.resetPasswordToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password changed succesfully" };
};
