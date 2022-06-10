import type { Claims } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';
import type { PrismaClient } from '@prisma/client';

import prisma from '../lib/prisma';

export type Context = {
  user: Claims;
  accessToken: string;
  prisma: PrismaClient;
};
export async function createContext({ req, res }): Promise<Context> {
  const session = getSession(req, res);
  if (session) {
    const { user, accessToken } = getSession(req, res);
    return {
      user,
      accessToken,
      prisma,
    };
  }
  return {
    user: null,
    prisma,
    accessToken: null,
  };
}
