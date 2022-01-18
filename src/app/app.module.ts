import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OptionCardComponent } from './option-card/option-card.component';
import { GamePageComponent } from './game-page/game-page.component';

@NgModule({
  declarations: [AppComponent, OptionCardComponent, GamePageComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
