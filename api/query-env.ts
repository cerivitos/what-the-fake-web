import type { VercelRequest, VercelResponse } from '@vercel/node';
import { environment } from '../src/environments/environment';
const dotenv = require('dotenv');

export default (req: VercelRequest, res: VercelResponse) => {
  dotenv.config();

  console.log(process.env);
  console.log(environment.production);
  console.log(process.env.VERCEL_GIT_COMMIT_SHA);

  if (environment.production && process.env.VERCEL_GIT_COMMIT_SHA) {
    res.status(200).send(process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7));
  } else {
    res.status(404).send('Not found');
  }
};
