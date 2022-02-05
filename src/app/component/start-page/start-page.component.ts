import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  version: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const envSubscription = this.http
      .get('/api/query-env')
      .pipe(
        tap((env: any) => {
          this.version = env['VERCEL_GITHUB_COMMIT_SHA'];

          envSubscription.unsubscribe();
        })
      )
      .subscribe();
  }
}
