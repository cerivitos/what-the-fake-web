import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameControllerService } from 'src/app/service/game-controller.service';

@Component({
  selector: 'app-rounds-display',
  templateUrl: './rounds-display.component.html',
  styleUrls: ['./rounds-display.component.css'],
})
export class RoundsDisplayComponent implements OnInit {
  constructor(private gameControllerService: GameControllerService) {}

  currentRound$!: Observable<number>;
  currentRound: number = 1;
  totalRounds!: number;

  ngOnInit(): void {
    this.currentRound$ = this.gameControllerService.round$;
    this.totalRounds = this.gameControllerService.totalRounds;
  }
}
