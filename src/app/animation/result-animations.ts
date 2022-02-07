import {
  animate,
  animateChild,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const resultAnimations = [
  trigger('badgeAnim', [
    transition(':enter', [
      query(':enter', [
        style({ opacity: 0, transform: 'scale(1.8) rotate(75deg)' }),
        stagger(180, [
          animate('360ms ease-in', style({ opacity: 1, transform: 'none' })),
        ]),
      ]),
    ]),
  ]),

  trigger('listAnim', [
    transition('* => *', [
      query('@enterAnim', [stagger(40, [animateChild()])]),
    ]),
    transition(':leave', [animate('40ms ease-out', style({ opacity: 0 }))]),
  ]),
];
