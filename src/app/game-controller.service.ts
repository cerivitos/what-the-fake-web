import { Injectable } from '@angular/core';
import { RedditItem } from './model/RedditItem';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameControllerService {
  constructor(private http: HttpClient) {}

  private _items: Subject<RedditItem[]> = new Subject<RedditItem[]>();
  public readonly items: Observable<RedditItem[]> = this._items.asObservable();

  private _error: Subject<string> = new Subject<string>();

  public readonly error: Observable<string> = this._error.asObservable();

  getPosts(getRealPosts: boolean = true) {
    this.http
      .get<RedditItem[]>(`/api/posts?real=${getRealPosts}`)
      .pipe(timeout(10000))
      .subscribe(
        (items) => this._items.next(items),
        (err) => this._error.next(err.message)
      );
  }
}
