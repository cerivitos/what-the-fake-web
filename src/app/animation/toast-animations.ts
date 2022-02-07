import { animate, style, transition, trigger } from '@angular/animations';

export const toastAnimations = [
  trigger('copyAnim', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0)' }),
      animate('140ms ease-in', style({ opacity: 1, transform: 'none' })),
    ]),
    transition(':leave', [
      animate('80ms ease-in', style({ opacity: 0, transform: 'scale(0)' })),
    ]),
  ]),
];
