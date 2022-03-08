import { NextApiRequest, NextApiResponse } from 'next';
import UserSchema from '../../../models/User';

export default async function hanlde(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * @method GET
   * @description GET ALL POST
   * @route /post
   */
  if (req.method === 'GET') {
    try {
      const users = await UserSchema.find({});

      return res
        .status(200)
        .json({ message: '✅ Get all users success.', data: users });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: '❌ Get all users failed.' });
    }
  }
}
