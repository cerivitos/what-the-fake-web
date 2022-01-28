import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundsDisplayComponent } from './rounds-display.component';

describe('RoundsDisplayComponent', () => {
  let component: RoundsDisplayComponent;
  let fixture: ComponentFixture<RoundsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
