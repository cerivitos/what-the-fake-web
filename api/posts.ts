const axios = require('axios').default;
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AxiosError, AxiosResponse } from 'axios';

export default (req: VercelRequest, res: VercelResponse) => {
  axios({
    method: 'get',
    timeout: 10000,
    url: 'https://api.reddit.com/r/nottheonion',
  })
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        res.status(200).json(response.data);
      } else {
        res.status(response.status).json(response.data);
      }
    })
    .catch((err: AxiosError) => {
      res.status(500).json(err);
    });
};
