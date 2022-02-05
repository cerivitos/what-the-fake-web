import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from '../model/Game';
import { Score } from '../model/Score';
import { GameControllerService } from './game-controller.service';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(
    private gameControllerService: GameControllerService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  createScoreObject(answerHistory: ('✓' | '×')[], time: number): Score {
    return {
      history: answerHistory?.map((answer) => (answer === '✓' ? true : false))!,
      time: time!,
      name: '',
    };
  }

  createGameObject(score: Score): Game {
    return {
      scores: [score],
      articles: this.gameControllerService.items!,
      topScore: score,
    };
  }

  updateScore(score: Score) {
    this.firestore
      .collection('games')
      .doc(this.router.url.split('/')[1])
      .update({
        scores: firebase.default.firestore.FieldValue.arrayUnion(score),
      });
  }

  async writeToStore(game: Game): Promise<DocumentReference<Game>> {
    return await this.firestore.collection<Game>('games').add(game);
  }
}
