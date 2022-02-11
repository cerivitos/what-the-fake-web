import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { resultAnimations } from 'src/app/animation/result-animations';
import { Game } from 'src/app/model/Game';
import { RedditItem } from 'src/app/model/RedditItem';
import { Score } from 'src/app/model/Score';
import { GameControllerService } from 'src/app/service/game-controller.service';
import { ResultService } from 'src/app/service/result.service';
import { isMobile } from 'src/util/mobile';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
  animations: resultAnimations,
})
export class ResultPageComponent implements OnInit {
  constructor(
    private gameControllerService: GameControllerService,
    private clipboard: Clipboard,
    private router: Router,
    private resultService: ResultService,
    private toast: HotToastService
  ) {}

  answerSubscription: Subscription | undefined;
  answerHistory: ('✓' | '×')[] | undefined;
  time: number | undefined;

  selectedRound: number = 0;
  itemsToShow: RedditItem[] | undefined;

  score: Score | undefined;
  game: Game | undefined;

  challengeUrl: string | undefined;

  ngOnInit(): void {
    this.answerSubscription = this.gameControllerService.answerHistory$
      .pipe(
        tap((answers) => {
          this.answerHistory = answers.map((answer) => (answer ? '✓' : '×'));

          //Show articles from first round as default
          this.itemsToShow = this.gameControllerService.items?.slice(0, 4);
          this.time = Date.now() - this.gameControllerService.startTime!;

          this.score = this.resultService.createScoreObject(
            this.answerHistory,
            this.time
          );

          this.game = this.resultService.createGameObject(this.score);

          this.answerSubscription?.unsubscribe();
        })
      )
      .subscribe();

    if (!this.router.url.includes('/game')) {
      this.challengeUrl = `https://wtf.notmydayjob.fyi/${
        this.router.url.split('/')[1]
      }`;

      this.resultService.updateScore(this.score!).catch((error) => {
        this.toast.error('Something went wrong :(');
        console.error(error);
      });
    }
  }

  convertMs(ms: number): string {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);

    return `${min}:${sec < 10 ? '0' + sec : sec}`;
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
    if (this.challengeUrl) {
      this.copyToClipboard();
    } else {
      this.resultService
        .writeToStore(this.game!)
        .then((docRef) => {
          this.challengeUrl = `https://wtf.notmydayjob.fyi/${docRef.id}`;
          this.copyToClipboard();
        })
        .catch((error) => {
          this.toast.error('Something went wrong :(');
          console.error(error);
        });
    }
  }

  copyToClipboard() {
    const textToCopy = `${this.answerHistory
      ?.map((ans) => (ans === '✓' ? '✅' : '❌'))
      .join('')}\n⏱️ ${this.convertMs(this.time!)}\n\n🔗 ${this.challengeUrl}`;

    if (isMobile()) {
      navigator.share({ text: textToCopy });
    } else {
      this.clipboard.copy(textToCopy);
      this.toast.success('Copied!');
    }
  }
}
