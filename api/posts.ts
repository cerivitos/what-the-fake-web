const axios = require('axios').default;
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AxiosError, AxiosResponse } from 'axios';

export default (req: VercelRequest, res: VercelResponse) => {
  const getRealPosts = req.query.real === 'true' ? true : false;

  axios({
    method: 'get',
    timeout: 10000,
    url: getRealPosts
      ? 'https://api.reddit.com/r/nottheonion'
      : 'https://api.reddit.com/r/theonion',
  })
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        const items = response.data['data']['children'];

        let posts: any[] = [];

        items.forEach((item: any) => {
          const itemData = item.data;

          if (itemData && !itemData?.stickied) {
            const imageUrl =
              itemData?.preview?.images?.[0]?.source?.url.replace(/amp;/g, '');

            posts.push({
              title: itemData.title,
              imageUrl: imageUrl,
              articleUrl: itemData?.url,
              isReal: getRealPosts ? true : false,
              redditLink: 'https://reddit.com' + item?.data?.permalink,
            });
          }
        });

        res.status(200).json(posts);
      } else {
        res.status(500).json(response.data);
      }
    })
    .catch((err: AxiosError) => {
      res.status(500).json(err);
    });
};
