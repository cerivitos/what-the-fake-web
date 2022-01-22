import { Injectable } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { filter, find, mergeMap, tap } from 'rxjs/operators';
import { RedditItem } from '../model/RedditItem';
import { GetPostsService } from './get-posts.service';

@Injectable({
  providedIn: 'root',
})
export class GameControllerService {
  constructor(private getPostsService: GetPostsService) {
    this.getPostsService.getAllPosts();
    this.getPostsService.items$.subscribe((posts) => {
      this.items = posts;
      this._itemsForRound$.next(this._getItemsForRound());

      const bonusCountdown = setInterval(() => {
        this._bonus$.next(this._bonus$.getValue() - 100);
        if (this._bonus$.getValue() === 0) clearInterval(bonusCountdown);
      }, 1000);
    });
  }

  totalRounds: number = 10;

  private _score$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly score$: Observable<number> = this._score$.asObservable();

  private _bonus$: BehaviorSubject<number> = new BehaviorSubject<number>(3000);
  public readonly bonus$: Observable<number> = this._bonus$.asObservable();

  private _round$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public readonly round$: Observable<number> = this._round$.asObservable();

  private _itemsForRound$: Subject<RedditItem[]> = new Subject<RedditItem[]>();
  public readonly itemsForRound$: Observable<RedditItem[]> =
    this._itemsForRound$.asObservable();

  items: RedditItem[] | undefined;

  setTotalRounds(rounds: number) {
    this.totalRounds = rounds;
    this._bonus$.next((this.totalRounds / 10) * 3000);
  }

  checkAnswer(postId: string) {
    const selectedItem = this.items?.filter((item) => item.postId === postId);

    if (selectedItem?.[0].isReal) {
      this._score$.next(this._score$.getValue() + 1);
    }

    this._round$.next(this._round$.getValue() + 1);
    this._itemsForRound$.next(this._getItemsForRound());
  }

  private _getItemsForRound(): RedditItem[] {
    const startingIndex = (this._round$.getValue() - 1) * 4;

    return (
      this.items?.filter(
        (_, index) =>
          index == startingIndex ||
          index == startingIndex + 1 ||
          index == startingIndex + 2 ||
          index == startingIndex + 3
      ) || []
    );
  }
}
