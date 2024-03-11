import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string | Date;
  updatedAt: string | Date;
  emailVerified: string | null;
};
