import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './component/start-page/start-page.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { TermsAndPrivacyComponent } from './component/terms-and-privacy/terms-and-privacy.component';

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'terms-and-privacy',
    component: TermsAndPrivacyComponent,
    pathMatch: 'full',
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./module/game/game.module').then((m) => m.GameModule),
  },
  {
    path: ':gameId',
    loadChildren: () =>
      import('./module/game/game.module').then((m) => m.GameModule),
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
