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
 * @param scale Used to calculate accidental
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
    throw new Error(`Accidentals aren't supported yet`);
  }
  return createNote(name);
}
