import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameControllerService {
  constructor() {}

  rounds: number = 10;

  setRounds(rounds: number) {
    this.rounds = rounds;
  }
}
