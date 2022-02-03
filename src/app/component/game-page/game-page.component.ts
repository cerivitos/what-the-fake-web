import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RedditItem } from '../../model/RedditItem';
import { GameControllerService } from 'src/app/service/game-controller.service';
import { cardAnimations } from 'src/app/animation/card-animations';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  animations: cardAnimations,
})
export class GamePageComponent implements OnInit {
  constructor(private gameControllerService: GameControllerService) {}

  items$: Observable<RedditItem[]> | undefined;
  score$: Observable<number> | undefined;
  round$: Observable<number> | undefined;
  bonus$: Observable<number> | undefined;

  ngOnInit(): void {
    this.gameControllerService.startGame();

    this.items$ = this.gameControllerService.itemsForRound$;
    this.score$ = this.gameControllerService.score$;
    this.round$ = this.gameControllerService.round$;
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
