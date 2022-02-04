import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css'],
  animations: [
    trigger('enterAnim', [
      transition(':enter', [
        style({ transform: 'translateY(8px)', opacity: 0 }),
        animate('100ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class ResultCardComponent implements OnInit {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() articleUrl!: string;
  @Input() isReal!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
