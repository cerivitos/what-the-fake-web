import { RedditItem } from './RedditItem';
import { Score } from './Score';

export interface Game {
  scores: Score[];
  articles: RedditItem[];
  topScore: Score;
}
