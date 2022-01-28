import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { observable, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameControllerService } from './service/game-controller.service';

@Injectable({
  providedIn: 'root',
})
export class ResultGuardGuard implements CanActivate {
  currentRound: number = 1;

  constructor(
    private gameControllerService: GameControllerService,
    private router: Router
  ) {
    this.gameControllerService.round$.subscribe(
      (round) => (this.currentRound = round)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.currentRound === this.gameControllerService.totalRounds) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }
}
