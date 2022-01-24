import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPostsService } from '../../service/get-posts.service';
import { RedditItem } from '../../model/RedditItem';
import { GameControllerService } from 'src/app/service/game-controller.service';
import {
  animate,
  group,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  animations: [
    trigger('cardTransition', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0.4,
            transform: 'scale(0.95)',
          }),
          stagger('80ms', [
            animate('260ms ease-in'),
            style({
              opacity: 1,
              transform: 'scale(1)',
            }),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class GamePageComponent implements OnInit {
  constructor(private gameControllerService: GameControllerService) {}

  items$: Observable<RedditItem[]> | undefined;
  score$: Observable<number> | undefined;
  round$: Observable<number> | undefined;
  bonus$: Observable<number> | undefined;

  ngOnInit(): void {
    this.items$ = this.gameControllerService.itemsForRound$;
    this.bonus$ = this.gameControllerService.bonus$;
    this.score$ = this.gameControllerService.score$;
    this.round$ = this.gameControllerService.round$;
  }
}
