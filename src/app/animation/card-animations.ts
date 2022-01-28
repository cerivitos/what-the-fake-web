import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const cardSelectDelay = 600;

export const cardAnimations = [
  trigger('cardSelectTransition', [
    state(
      'default',
      style({
        opacity: 1,
        transform: 'scale(1)',
      })
    ),
    state(
      'notSelected',
      style({
        opacity: 0,
        transform: 'scale(0.9)',
      })
    ),
    transition('default => notSelected', [
      animate(`${cardSelectDelay}ms ease-out`),
    ]),
  ]),
  trigger('nextRoundTransition', [
    transition('* => *', [
      query(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95)',
        }),
        stagger('80ms', [
          animate('260ms ease-in'),
          style({
            opacity: 1,
            transform: 'scale(1)',
          }),
        ]),
      ]),
    ]),
  ]),
];
