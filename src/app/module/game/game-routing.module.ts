import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultPageComponent } from 'src/app/component/result-page/result-page.component';
import { ResultGuardGuard } from 'src/app/result-guard.guard';
import { GamePageComponent } from '../../component/game-page/game-page.component';

const routes: Routes = [
  { path: '', component: GamePageComponent },
  {
    path: 'result',
    component: ResultPageComponent,
    canActivate: [ResultGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
