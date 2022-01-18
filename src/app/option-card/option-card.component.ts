import { Component, Input, OnInit } from '@angular/core';
import { RedditItem } from '../model/RedditItem';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css'],
})
export class OptionCardComponent implements OnInit {
  @Input() item!: RedditItem;

  constructor() {}

  ngOnInit(): void {}
}
