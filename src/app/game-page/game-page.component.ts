import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPostsService } from '../service/get-posts.service';
import { RedditItem } from '../model/RedditItem';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  constructor(private getPostsService: GetPostsService) {}

  items$: Observable<RedditItem[]> | undefined;

  ngOnInit(): void {
    this.items$ = this.getPostsService.items;
    this.getPostsService.getAllPosts();
  }
}
