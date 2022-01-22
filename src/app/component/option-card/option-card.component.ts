import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css'],
})
export class OptionCardComponent implements OnInit {
  @Input() title!: string;
  @Input() imageUrl!: string;

  constructor() {}

  ngOnInit(): void {}
}
