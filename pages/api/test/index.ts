import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ Text: '🟢 Hello Word !!!' });
}