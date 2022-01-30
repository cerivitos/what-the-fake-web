import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultPageComponent } from '../../component/result-page/result-page.component';
import { ResultGuardGuard } from '../../result-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ResultPageComponent,
    canActivate: [ResultGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRoutingModule {}
