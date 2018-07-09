import {
  AbsoluteNote,
  Scale,
  Interval,
  NOTE_NAMES,
  createNote,
  NoteName,
  NoteIdentity,
} from './types';

/**
 * @param scale Used to calculate accidental (TODO: actually do this)
 */
export function absoluteNoteToIdentity(
  note: AbsoluteNote,
  scale: Scale
): NoteIdentity {
  let relative = note % Interval.OCTAVE;
  if (relative < 0) relative += Interval.OCTAVE;
  const name = (Object.keys(NOTE_NAMES) as NoteName[]).find(
    k => NOTE_NAMES[k] === relative
  );
  if (!name) {
    switch (relative) {
      case NOTE_NAMES.C + 1:
        return createNote('C', 'sharp');
      case NOTE_NAMES.E - 1:
        return createNote('E', 'flat');
      case NOTE_NAMES.F + 1:
        return createNote('F', 'sharp');
      case NOTE_NAMES.A - 1:
        return createNote('A', 'flat');
      case NOTE_NAMES.B - 1:
        return createNote('B', 'flat');
      default:
        throw new Error(`Catastrophic failure to identity note ${note}`);
    }
  }
  return createNote(name);
}

/**
 * Note that this only gets _one_ possible note that matches the identity,
 * usually between middle C and treble C.
 * `x` is not guaranteed to equal `getAbsoluteNoteForIdentity(absoluteNoteToIdentity(x))`!
 */
export function getAbsoluteNoteForIdentity(note: NoteIdentity): AbsoluteNote {
  const natural = NOTE_NAMES[note.name];
  let modifier = 0;
  switch (note.type) {
    case 'natural':
      modifier = 0;
      break;
    case 'sharp':
      modifier = 1;
      break;
    case 'flat':
      modifier = -1;
      break;
    default:
      throw new Error(`Unrecognized note type "${note.type}"`);
  }
  return natural + modifier;
}

export function getNotesInScale(scale: Scale): NoteIdentity[] {
  const tonic = getAbsoluteNoteForIdentity(scale.tonic);
  let notes: AbsoluteNote[];
  switch (scale.mode) {
    case 'major':
      notes = [
        Interval.UNISON,
        Interval.MAJOR_SECOND,
        Interval.MAJOR_THIRD,
        Interval.PERFECT_FOURTH,
        Interval.PERFECT_FIFTH,
        Interval.MAJOR_SIXTH,
        Interval.MAJOR_SEVENTH,
      ];
      break;
    case 'minor':
      notes = [
        Interval.UNISON,
        Interval.MAJOR_SECOND,
        Interval.MINOR_THIRD,
        Interval.PERFECT_FOURTH,
        Interval.PERFECT_FIFTH,
        Interval.MINOR_SIXTH,
        Interval.MINOR_SEVENTH,
      ];
      break;
    default:
      throw new Error(`Mode "${scale.mode}" is not yet supported`);
  }
  return notes.map(x => absoluteNoteToIdentity(tonic + x, scale));
}

export const noteEquals = (a: NoteIdentity, b: NoteIdentity) => {
  return getAbsoluteNoteForIdentity(a) === getAbsoluteNoteForIdentity(b);
};
