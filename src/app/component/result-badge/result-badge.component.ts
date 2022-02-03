import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-result-badge',
  templateUrl: './result-badge.component.html',
  styleUrls: ['./result-badge.component.css'],
})
export class ResultBadgeComponent implements OnInit {
  @Input() result: '✓' | '×' | undefined;
  @Input() index: number | undefined;
  @Input() selectedRound: number | undefined;

  styleClass: string = '';

  constructor() {}

  ngOnInit(): void {
    this.result === '✓'
      ? (this.styleClass = 'from-emerald-400 to-cyan-400 text-emerald-600')
      : (this.styleClass = 'from-rose-400 to-orange-400 text-rose-600');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedRound) {
      this.updateStyleClass(changes.selectedRound.currentValue);
    }
  }

  updateStyleClass(selectedRound: number): void {
    console.log(`index: ${this.index} selected: ${selectedRound}`);
    if (this.index === selectedRound) {
      this.styleClass = this.styleClass + ' scale-[0.85]';
    } else {
      this.styleClass = this.styleClass.replace(' scale-[0.85]', '');
    }
  }
}
