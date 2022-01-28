import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { OptionCardComponent } from '../../component/option-card/option-card.component';
import { GamePageComponent } from '../../component/game-page/game-page.component';
import { RoundsDisplayComponent } from '../../component/rounds-display/rounds-display.component';
import { ResultPageComponent } from '../../component/result-page/result-page.component';

@NgModule({
  declarations: [
    OptionCardComponent,
    GamePageComponent,
    RoundsDisplayComponent,
    ResultPageComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
