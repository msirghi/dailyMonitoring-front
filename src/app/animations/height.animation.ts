import { animate, state, style, transition, trigger } from '@angular/animations';

export const heightAnimation = trigger('changeDivSize', [
  state('initial', style({
    height: '0px',
    opacity: '0',
    overflow: 'hidden',
  })),
  state('final', style({
    height: '*',
    opacity: '1',
  })),
  transition('initial=>final', animate('200ms')),
  transition('final=>initial', animate('200ms'))
]);
