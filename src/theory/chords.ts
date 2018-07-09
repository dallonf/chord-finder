import * as _ from 'lodash';
import {
  AbsoluteNote,
  Interval,
  ChordIdentity,
  Scale,
  MIDDLE_C,
  C_MAJOR,
  createChord,
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
  let notes: AbsoluteNote[];
  switch (chord.type) {
    case 'major':
      notes = majorTriad(absoluteRoot);
      break;
    case 'minor':
      notes = minorTriad(absoluteRoot);
      break;
    default:
      throw new Error(`Unrecognized chord type ${chord.type}`);
  }
  chord.extensions.forEach(e => {
    switch (e) {
      case '7':
        notes.push(absoluteRoot + Interval.MINOR_SEVENTH);
        break;
      case 'maj7':
        notes.push(absoluteRoot + Interval.MAJOR_SEVENTH);
        break;
    }
  });
  return notes;
}

export function notesForChord(chord: ChordIdentity, scale: Scale) {
  return absoluteNotesForChordIdentity(chord).map(x =>
    absoluteNoteToIdentity(x, scale)
  );
}

export const getAllTriads = (scale = C_MAJOR) =>
  _.flatMap(
    _.range(MIDDLE_C, Interval.OCTAVE),
    note =>
      [
        createChord(absoluteNoteToIdentity(note, scale), 'major'),
        createChord(absoluteNoteToIdentity(note, scale), 'minor'),
        createChord(absoluteNoteToIdentity(note, scale), 'major', ['7']),
        createChord(absoluteNoteToIdentity(note, scale), 'major', ['maj7']),
        createChord(absoluteNoteToIdentity(note, scale), 'minor', ['7']),
      ] as ChordIdentity[]
  );
