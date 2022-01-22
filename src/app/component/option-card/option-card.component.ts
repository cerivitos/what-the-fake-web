import { Component, Input, OnInit } from '@angular/core';
import { GameControllerService } from 'src/app/service/game-controller.service';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css'],
})
export class OptionCardComponent implements OnInit {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() postId!: string;

  constructor(private gameControllerService: GameControllerService) {}

  ngOnInit(): void {}

  submitAnswer(): void {
    this.gameControllerService.checkAnswer(this.postId);
  }
}
