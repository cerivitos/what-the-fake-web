import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  version: string = '';

  constructor() {}

  ngOnInit(): void {
    if (environment.production) {
      //@ts-ignore
      this.version = ANGULAR_VERCEL_GIT_COMMIT_SHA ?? '';
      //@ts-ignore
      console.log(VERCEL_GIT_COMMIT_SHA);
      //@ts-ignore
      console.log(process.env.VERCEL_GIT_COMMIT_SHA);
    }
  }
}
