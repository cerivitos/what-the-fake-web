import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  if (process.env.VERCEL_GITHUB_COMMIT_SHA) {
    res.status(200).send(process.env.VERCEL_GITHUB_COMMIT_SHA?.slice(0, 7));
  } else {
    res.status(404).send('Not found');
  }
};
