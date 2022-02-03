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
  ) {}

  totalRounds: number = 10;

  startTime: number | undefined;

  private _answerHistory$: BehaviorSubject<boolean[]> = new BehaviorSubject<
    boolean[]
  >([]);
  public readonly answerHistory$: Observable<boolean[]> =
    this._answerHistory$.asObservable();

  private _round$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public readonly round$: Observable<number> = this._round$.asObservable();

  private _itemsForRound$: Subject<RedditItem[]> = new Subject<RedditItem[]>();
  public readonly itemsForRound$: Observable<RedditItem[]> =
    this._itemsForRound$.asObservable();

  submittedAnswer: string | undefined;

  items: RedditItem[] | undefined;

  startGame() {
    this.startTime = Date.now();
    this._answerHistory$.next([]);
    this._round$.next(1);
    this._itemsForRound$.next([]);

    this.getPostsService.getAllPosts();
    this.getPostsService.items$.subscribe((posts) => {
      this.items = posts;
      this._preloadImages();
      this._itemsForRound$.next(this._getItemsForRound());
    });
  }

  setTotalRounds(rounds: number) {
    this.totalRounds = rounds;
  }

  submitAnswer(postId: string) {
    this.submittedAnswer = postId;

    //Wait for selection animation to finish before checking answer and advancing to next round
    setTimeout(() => {
      this.checkAnswer();
    }, cardSelectDelay + 180);
  }

  checkAnswer() {
    const selectedItem = this.items?.filter(
      (item) => item.postId === this.submittedAnswer
    );

    this._answerHistory$.next([
      ...this._answerHistory$.getValue(),
      selectedItem?.[0].isReal!,
    ]);

    this.submittedAnswer = undefined;

    if (this._round$.getValue() < this.totalRounds) {
      this._round$.next(this._round$.getValue() + 1);
      this._itemsForRound$.next(this._getItemsForRound());
    } else {
      this._itemsForRound$.next([]);
      this.router.navigateByUrl('/game/result');
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
