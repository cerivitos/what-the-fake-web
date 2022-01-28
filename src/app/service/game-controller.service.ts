import { Injectable } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { cardSelectDelay } from '../animation/card-animations';
import { RedditItem } from '../model/RedditItem';
import { GetPostsService } from './get-posts.service';

@Injectable({
  providedIn: 'root',
})
export class GameControllerService {
  constructor(
    private getPostsService: GetPostsService,
    private router: Router
  ) {
    this.getPostsService.getAllPosts();
    this.getPostsService.items$.subscribe((posts) => {
      this.items = posts;
      this._preloadImages();
      this._itemsForRound$.next(this._getItemsForRound());

      this.bonusCountdown = setInterval(() => {
        this._bonus$.next(this._bonus$.getValue() - 10);
        if (this._bonus$.getValue() === 0) clearInterval(this.bonusCountdown);
      }, 1000);
    });
  }

  totalRounds: number = 10;

  private _score$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly score$: Observable<number> = this._score$.asObservable();

  private _bonus$: BehaviorSubject<number> = new BehaviorSubject<number>(3000);
  public readonly bonus$: Observable<number> = this._bonus$.asObservable();

  bonusCountdown!: any;

  private _round$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public readonly round$: Observable<number> = this._round$.asObservable();

  private _itemsForRound$: Subject<RedditItem[]> = new Subject<RedditItem[]>();
  public readonly itemsForRound$: Observable<RedditItem[]> =
    this._itemsForRound$.asObservable();

  submittedAnswer: string | undefined;

  items: RedditItem[] | undefined;

  setTotalRounds(rounds: number) {
    this.totalRounds = rounds;
    this._bonus$.next((this.totalRounds / 10) * 3000);
  }

  submitAnswer(postId: string) {
    this.submittedAnswer = postId;

    //Wait for selection animation to finish before checking answer and advancing to next round
    setTimeout(() => {
      this.checkAnswer();
    }, cardSelectDelay);
  }

  checkAnswer() {
    const selectedItem = this.items?.filter(
      (item) => item.postId === this.submittedAnswer
    );

    if (selectedItem?.[0].isReal) {
      this._score$.next(this._score$.getValue() + 1);
    }

    this.submittedAnswer = undefined;

    if (this._round$.getValue() < this.totalRounds) {
      this._round$.next(this._round$.getValue() + 1);
      this._itemsForRound$.next(this._getItemsForRound());
    } else {
      this._itemsForRound$.next([]);
      clearInterval(this.bonusCountdown);
      this._score$.next(this._score$.getValue() + this._bonus$.getValue());

      this.router.navigate(['/game/result']);
    }
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

  private _preloadImages(): void {
    this.items?.forEach((item) => {
      const image = new Image();
      image.src = item.imageUrl;
    });
  }
}
