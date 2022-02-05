import type { VercelRequest, VercelResponse } from '@vercel/node';
import { environment } from '../src/environments/environment';
require('dotenv').config();

export default (req: VercelRequest, res: VercelResponse) => {
  if (environment.production && process.env.VERCEL_GITHUB_COMMIT_SHA) {
    res.status(200).send(process.env.VERCEL_GITHUB_COMMIT_SHA?.slice(0, 7));
  } else {
    res.status(404).send(process.env);
  }
};
