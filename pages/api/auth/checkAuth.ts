import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    return res.send({
      message: 'Authenticated User.✅',
      session,
    });
  }

  res.status(401).send({
    error: 'Unauthorization.😈',
  });
}
