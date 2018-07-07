import { AbsoluteNote, Interval } from './types';

export function majorTriad(root: AbsoluteNote) {
  return [root, root + Interval.MAJOR_THIRD, root + Interval.PERFECT_FIFTH];
}

export function minorTriad(root: AbsoluteNote) {
  return [root, root + Interval.MINOR_THIRD, root + Interval.PERFECT_FIFTH];
}
