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
      .get<string>('/api/query-env')
      .pipe(
        tap((version) => {
          this.version = version;
          envSubscription.unsubscribe();
        })
      )
      .subscribe();
  }
}
