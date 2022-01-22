import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPostsService } from '../../service/get-posts.service';
import { RedditItem } from '../../model/RedditItem';
import { GameControllerService } from 'src/app/service/game-controller.service';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
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
