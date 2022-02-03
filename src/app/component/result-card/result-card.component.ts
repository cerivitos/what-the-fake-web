import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css'],
})
export class ResultCardComponent implements OnInit {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() articleUrl!: string;
  @Input() isReal!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
