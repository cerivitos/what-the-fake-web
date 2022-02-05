import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RedditItem } from '../../model/RedditItem';
import { GameControllerService } from 'src/app/service/game-controller.service';
import { cardAnimations } from 'src/app/animation/card-animations';
import { Router } from '@angular/router';

import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from '@angular/fire/app-check';
import { getApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  animations: cardAnimations,
})
export class GamePageComponent implements OnInit {
  constructor(
    private gameControllerService: GameControllerService,
    private router: Router
  ) {}

  storeSubscription: Subscription | undefined;

  items$: Observable<RedditItem[]> | undefined;
  score$: Observable<number> | undefined;
  round$: Observable<number> | undefined;
  bonus$: Observable<number> | undefined;

  ngOnInit(): void {
    //Initialize Firebase App Check
    initializeAppCheck(getApp(), {
      provider: new ReCaptchaV3Provider(environment.appCheck.key),
      isTokenAutoRefreshEnabled: true,
    });

    this.items$ = this.gameControllerService.itemsForRound$;
    this.round$ = this.gameControllerService.round$;

    //Check if this is a challenge game and manually set the articles from firestore
    if (!this.router.url.includes('game')) {
      const gameId = this.router.url.slice(1);

      this.gameControllerService.startChallengeGame(gameId);
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
