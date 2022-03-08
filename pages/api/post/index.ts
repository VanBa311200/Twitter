import { NextApiRequest, NextApiResponse } from 'next';
import PostSchema from '../../../models/Post';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * @method POST
   * @description CREATE NEW POST
   * @route /post
   */
  if (req.method === 'POST') {
    console.log(req.body);

    try {
      const post = await new PostSchema(req.body).save();
      if (post) {
        return res
          .status(200)
          .json({ message: '✅Create post success.', data: post });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(500).json({ message: 'Server interval.' });
  }

  /**
   * @method GET
   * @description GET ALL POST
   * @route /post
   */
  if (req.method === 'GET') {
    await PostSchema.find({})
      .sort({ createdAt: -1 })
      .populate('userRef')
      .then((value) => {
        return res.json({ message: '✅Get all post success.', data: value });
      });
  }
}
