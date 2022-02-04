import {
  animate,
  animateChild,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Game } from 'src/app/model/Game';
import { RedditItem } from 'src/app/model/RedditItem';
import { Score } from 'src/app/model/Score';
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
      transition('* => *', [
        query('@enterAnim', [stagger(40, [animateChild()])]),
      ]),
      transition(':leave', [animate('40ms ease-out', style({ opacity: 0 }))]),
    ]),

    trigger('challengeUrlAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(14px)' }),
        animate('140ms ease-in', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),

    trigger('copyAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('140ms ease-in', style({ opacity: 1, transform: 'none' })),
      ]),
      transition(':leave', [
        animate('80ms ease-in', style({ opacity: 0, transform: 'scale(0)' })),
      ]),
    ]),
  ],
})
export class ResultPageComponent implements OnInit {
  constructor(
    private gameControllerService: GameControllerService,
    private firestore: AngularFirestore,
    private clipboard: Clipboard
  ) {}

  answerSubscription: Subscription | undefined;
  answerHistory: ('✓' | '×')[] | undefined;
  time: number | undefined;

  selectedRound: number = 0;
  itemsToShow: RedditItem[] | undefined;

  challengeUrl: string | undefined;
  copied: boolean = false;

  @ViewChild('copyArea', { static: true }) copyArea: ElementRef | undefined;

  ngOnInit(): void {
    this.answerSubscription = this.gameControllerService.answerHistory$
      .pipe(
        tap((answers) => {
          this.answerHistory = answers.map((answer) => (answer ? '✓' : '×'));
        })
      )
      .subscribe();

    //Show articles from first round as default
    this.itemsToShow = this.gameControllerService.items?.slice(0, 4);
    this.time = Date.now() - this.gameControllerService.startTime!;
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
      this.selectedRound = -1;
      this.itemsToShow = this.gameControllerService.items;
    } else {
      this.selectedRound = round;
      this.itemsToShow = this.gameControllerService.items?.slice(
        round * 4,
        round * 4 + 4
      );
    }
  }

  writeToStore() {
    if (this.challengeUrl) return;

    const score: Score = {
      history: this.answerHistory?.map((answer) =>
        answer === '✓' ? true : false
      )!,
      time: this.time!,
      name: '',
    };

    const game: Game = {
      scores: [score],
      articles: this.gameControllerService.items!,
      topScore: score,
    };

    this.firestore
      .collection<Game>('games')
      .add(game)
      .then((docRef) => {
        this.challengeUrl = `https://what-the-fake-web.vercel.app/${docRef.id}`;
        this.copyToClipboard();
      });
  }

  copyToClipboard() {
    const textToCopy = `${this.answerHistory
      ?.map((ans) => (ans === '✓' ? '✅' : '❌'))
      .join('')}\n⏱️ ${this.convertMs(this.time!)}\n\n🔗 ${this.challengeUrl}`;

    navigator.share({ text: textToCopy }).catch((err) => {
      this.clipboard.copy(textToCopy);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }
}
