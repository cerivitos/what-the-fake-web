import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBadgeComponent } from './result-badge.component';

describe('ResultBadgeComponent', () => {
  let component: ResultBadgeComponent;
  let fixture: ComponentFixture<ResultBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
