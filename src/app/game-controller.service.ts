import { Injectable } from '@angular/core';
import { RedditItem } from './model/RedditItem';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { shuffle } from 'src/util/shuffle';

@Injectable({
  providedIn: 'root',
})
export class GameControllerService {
  constructor(private http: HttpClient) {}

  rounds: number = 10;

  private _items: Subject<RedditItem[]> = new Subject<RedditItem[]>();
  public readonly items: Observable<RedditItem[]> = this._items.asObservable();

  private _error: Subject<string> = new Subject<string>();
  public readonly error: Observable<string> = this._error.asObservable();

  private _getPosts(
    truePosts: boolean = false,
    limit: number
  ): Observable<RedditItem[]> {
    return this.http.get<RedditItem[]>(
      `/api/posts?real=${truePosts}&limit=${limit}`
    );
  }

  /**
   * Get posts from r/theonion and r/nottheonion, and merge them together.
   * Subsequently, randomly assign them in sets of 4 comprising 1 real post and 3 fake posts.
   */
  getAllPosts() {
    forkJoin([this._getPosts(true, 100), this._getPosts(false, 100)])
      .pipe(timeout(10000))
      .subscribe(
        (posts) => {
          this._items.next(this._arrangePosts(posts));
        },
        (error) => this._error.next(error)
      );
  }

  private _arrangePosts(posts: [RedditItem[], RedditItem[]]): RedditItem[] {
    let finalPosts: RedditItem[] = [];
    const realPosts = posts[0];
    const fakePosts = posts[1];

    for (let i = 0; i < this.rounds; i++) {
      // Temp array to hold the 4 posts for this round (1 real post and 3 fake posts)
      let roundPosts: RedditItem[] = [];

      // Randomly select a real post and remove it from the real posts source array to avoid duplicates in the game
      const realPostIndex = Math.floor(Math.random() * realPosts.length);
      roundPosts.push(realPosts[realPostIndex]);
      realPosts.splice(realPostIndex, 1);

      // Randomly select 3 fake posts and remove it from the fake posts source array to avoid duplicates in the game
      for (let j = 0; j < 3; j++) {
        const fakePostIndex = Math.floor(Math.random() * fakePosts.length);
        roundPosts.push(fakePosts[fakePostIndex]);
        fakePosts.splice(fakePostIndex, 1);
      }

      finalPosts.push(...shuffle<RedditItem>(roundPosts));
    }

    return finalPosts;
  }

  setRounds(rounds: number) {
    this.rounds = rounds;
  }
}
