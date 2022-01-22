import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { OptionCardComponent } from '../../component/option-card/option-card.component';
import { GamePageComponent } from '../../component/game-page/game-page.component';

@NgModule({
  declarations: [OptionCardComponent, GamePageComponent],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
