import * as _ from 'lodash';
import {
  AbsoluteNote,
  Interval,
  ChordIdentity,
  Scale,
  MIDDLE_C,
  C_MAJOR,
} from './types';
import {
  getAbsoluteNoteForIdentity,
  absoluteNoteToIdentity,
} from './conversion';

export function majorTriad(root: AbsoluteNote) {
  return [root, root + Interval.MAJOR_THIRD, root + Interval.PERFECT_FIFTH];
}

export function minorTriad(root: AbsoluteNote) {
  return [root, root + Interval.MINOR_THIRD, root + Interval.PERFECT_FIFTH];
}

function absoluteNotesForChordIdentity(chord: ChordIdentity) {
  const absoluteRoot = getAbsoluteNoteForIdentity(chord.root);
  switch (chord.type) {
    case 'major':
      return majorTriad(absoluteRoot);
    case 'minor':
      return minorTriad(absoluteRoot);
  }
}

export function notesForChord(chord: ChordIdentity, scale: Scale) {
  return absoluteNotesForChordIdentity(chord).map(x =>
    absoluteNoteToIdentity(x, scale)
  );
}

export const getAllTriads = (scale = C_MAJOR) =>
  _.flatMap(_.range(MIDDLE_C, Interval.OCTAVE), note => [
    {
      root: absoluteNoteToIdentity(note, scale),
      type: 'major',
    },
    {
      root: absoluteNoteToIdentity(note, scale),
      type: 'minor',
    },
  ]) as ChordIdentity[];
