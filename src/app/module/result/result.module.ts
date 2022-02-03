import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultPageComponent } from '../../component/result-page/result-page.component';
import { ResultCardComponent } from '../../component/result-card/result-card.component';
import { ResultBadgeComponent } from '../../component/result-badge/result-badge.component';

@NgModule({
  declarations: [ResultPageComponent, ResultCardComponent, ResultBadgeComponent],
  imports: [CommonModule, ResultRoutingModule],
})
export class ResultModule {}
