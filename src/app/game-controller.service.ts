import { Injectable } from '@angular/core';
import { RedditItem } from './model/RedditItem';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameControllerService {
  constructor(private http: HttpClient) {}

  getPosts(getRealPosts: boolean = true): Observable<RedditItem[]> {
    return this.http
      .get<RedditItem[]>(`/api/posts?real=${getRealPosts}`)
      .pipe(tap((items) => console.log(items)));
  }
}
