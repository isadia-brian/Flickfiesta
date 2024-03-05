import { db } from "@/lib/db";

export const getEmail = async (email: string) => {
  try {
    const userEmail = await db.mailingList.findUnique({
      where: { email },
    });

    return userEmail;
  } catch (error) {
    return null;
  }
};
