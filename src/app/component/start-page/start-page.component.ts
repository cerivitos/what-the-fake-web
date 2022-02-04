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
      this.version = process.env.ANGULAR_ENV_VERCEL_GIT_COMMIT_SHA ?? '';
    }
  }
}
