import { NoteIdentity, createNote, NoteName } from './theory/types';

const REGEX = /^([A-G])(#|b)?$/;

export function parseNotes(input: string): NoteIdentity[] {
  const noteStrings = input.split(' ').filter(x => x.length);
  return noteStrings.map(noteString => {
    const componentMatch = noteString.match(REGEX);
    if (!componentMatch)
      throw new ParseNoteError(`"${noteString}" is not a valid note name`);
    const note = createNote(componentMatch[1] as NoteName);
    if (componentMatch[2] === '#') {
      note.type = 'sharp';
    } else if (componentMatch[2] === 'b') {
      note.type = 'flat';
    }
    return note;
  });
}

export class ParseNoteError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ParseNoteError.prototype);
  }
}
