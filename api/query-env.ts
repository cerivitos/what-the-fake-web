import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json(process.env.VERCEL_GITHUB_COMMIT_SHA?.slice(0, 7));
};
