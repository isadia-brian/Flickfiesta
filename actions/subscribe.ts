"use server";

import * as z from "zod";
import { SubscribeSchema } from "@/helpers/schemas";
import { getEmail } from "@/data/mailing";
import { db } from "@/lib/db";
import { sendSubscribeEmail } from "@/lib/email-helper";

export const subscribe = async (values: z.infer<typeof SubscribeSchema>) => {
  const validatedField = SubscribeSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid email!" };
  }
  const { email } = validatedField.data;

  const existingEmail = await getEmail(email);

  if (existingEmail) {
    return { error: "You are already on the mailing list" };
  }

  await db.mailingList.create({
    data: {
      email,
    },
  });

  await sendSubscribeEmail(email);
  return { success: "You have been added to the mailing list" };
};
