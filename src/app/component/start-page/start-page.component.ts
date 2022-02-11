import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GameControllerService } from 'src/app/service/game-controller.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  version: string = '';
  rounds: number = 5;

  constructor(
    private http: HttpClient,
    private gameControllerService: GameControllerService
  ) {}

  ngOnInit(): void {
    const envSubscription = this.http
      .get('/api/query-env', { responseType: 'text' })
      .pipe(
        tap((version) => {
          this.version = version;
          envSubscription.unsubscribe();
        })
      )
      .subscribe();

    this.rounds = this.gameControllerService.totalRounds;
  }
}
