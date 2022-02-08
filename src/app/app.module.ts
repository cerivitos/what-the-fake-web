import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './component/start-page/start-page.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppCheckModule } from '@angular/fire/app-check';
import { HotToastModule } from '@ngneat/hot-toast';
import { TermsAndPrivacyComponent } from './component/terms-and-privacy/terms-and-privacy.component';

@NgModule({
  declarations: [AppComponent, StartPageComponent, TermsAndPrivacyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppCheckModule,
    HotToastModule.forRoot({
      duration: 3000,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
