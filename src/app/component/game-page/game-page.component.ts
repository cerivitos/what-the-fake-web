import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RedditItem } from '../../model/RedditItem';
import { GameControllerService } from 'src/app/service/game-controller.service';
import { cardAnimations } from 'src/app/animation/card-animations';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/app/model/Game';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  animations: cardAnimations,
})
export class GamePageComponent implements OnInit {
  constructor(
    private gameControllerService: GameControllerService,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  storeSubscription: Subscription | undefined;

  items$: Observable<RedditItem[]> | undefined;
  score$: Observable<number> | undefined;
  round$: Observable<number> | undefined;
  bonus$: Observable<number> | undefined;

  ngOnInit(): void {
    this.items$ = this.gameControllerService.itemsForRound$;
    this.round$ = this.gameControllerService.round$;

    //Check if this is a challenge game and manually set the articles from firestore
    if (!this.router.url.includes('game')) {
      const gameId = this.router.url.slice(1);

      this.storeSubscription = this.firestore
        .collection<Game>('games')
        .doc(gameId)
        .get()
        .pipe(
          tap((doc) => {
            const articles = doc.data()?.articles!;

            this.gameControllerService.startChallengeGame(articles);

            this.storeSubscription?.unsubscribe();
          })
        )
        .subscribe();
    } else {
      this.gameControllerService.startGame();
    }
  }

  checkIfCardSelected(postId: string): string {
    if (
      this.gameControllerService.submittedAnswer !== undefined &&
      this.gameControllerService.submittedAnswer !== postId
    ) {
      return 'notSelected';
    } else {
      return 'default';
    }
  }
}
