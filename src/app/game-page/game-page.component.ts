import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameControllerService } from '../game-controller.service';
import { RedditItem } from '../model/RedditItem';
import { OptionCardComponent } from '../option-card/option-card.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  constructor(private gameController: GameControllerService) {}

  items$!: Observable<RedditItem[]>;

  ngOnInit(): void {
    this.items$ = this.gameController.getPosts();
  }
}
