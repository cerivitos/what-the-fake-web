import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedditItem } from 'src/app/model/RedditItem';
import { GameControllerService } from 'src/app/service/game-controller.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
  animations: [
    trigger('badgeAnim', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(1.8) rotate(75deg)' }),
          stagger(180, [
            animate('360ms ease-in', style({ opacity: 1, transform: 'none' })),
          ]),
        ]),
      ]),
    ]),

    trigger('listAnim', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(40px)' }),
            stagger(180, [
              animate(
                '360ms ease-in',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ResultPageComponent implements OnInit {
  constructor(private gameControllerService: GameControllerService) {}

  answerSubscription: Subscription | undefined;
  answerHistory: ('✓' | '×')[] | undefined;
  time: number | undefined;

  selectedRound: number | undefined;
  itemsToShow: RedditItem[] = [];

  ngOnInit(): void {
    this.answerSubscription = this.gameControllerService.answerHistory$
      .pipe(
        tap((answers) => {
          this.answerHistory = answers.map((answer) => (answer ? '✓' : '×'));
        })
      )
      .subscribe();
    this.time = Date.now() - this.gameControllerService.startTime!;

    this.itemsToShow = this.gameControllerService.items!;
  }

  ngOnDestroy(): void {
    this.answerSubscription?.unsubscribe();
  }

  convertMs(ms: number): string {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);

    return `${min}:${sec < 10 ? '00' : sec}`;
  }

  setRoundToShow(round: number) {
    if (this.selectedRound === round) {
      this.selectedRound = undefined;
      this.itemsToShow = this.gameControllerService.items!;
    } else {
      this.selectedRound = round;
      this.itemsToShow = this.gameControllerService.items!.slice(
        round * 4,
        round * 4 + 4
      );
    }
  }
}
