import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: GamePageComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
