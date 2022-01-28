import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameControllerService } from 'src/app/service/game-controller.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
})
export class ResultPageComponent implements OnInit {
  constructor(private gameControllerService: GameControllerService) {}

  score$: Observable<number> | undefined;

  ngOnInit(): void {
    this.score$ = this.gameControllerService.score$;
  }
}
