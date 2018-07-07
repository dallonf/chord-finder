export enum Interval {
  UNISON = 0,
  MINOR_SECOND = 1,
  MAJOR_SECOND = 2,
  MINOR_THIRD = 3,
  MAJOR_THIRD = 4,
  PERFECT_FOURTH = 5,
  TRITONE = 6,
  PERFECT_FIFTH = 7,
  MINOR_SIXTH = 8,
  MAJOR_SIXTH = 9,
  MINOR_SEVENTH = 10,
  MAJOR_SEVENTH = 11,
  OCTAVE = 12,
}

export enum NoteType {
  NATURAL = 0,
  SHARP = 1,
  FLAT = -1,
}

export type Mode = 'major' | 'minor';

export type AbsoluteNote = number;

export const MIDDLE_C: AbsoluteNote = 0;

export const NOTE_NAMES = {
  C: MIDDLE_C,
  D: MIDDLE_C + Interval.MAJOR_SECOND,
  E: MIDDLE_C + Interval.MAJOR_THIRD,
  F: MIDDLE_C + Interval.PERFECT_FOURTH,
  G: MIDDLE_C + Interval.PERFECT_FIFTH,
  A: MIDDLE_C + Interval.MAJOR_SIXTH,
  B: MIDDLE_C + Interval.MAJOR_SEVENTH,
};
export type NoteName = keyof typeof NOTE_NAMES;

export interface NoteIdentity {
  name: NoteName;
  type: NoteType;
}
export const createNote = (
  name: NoteName,
  type: 'natural' | 'sharp' | 'flat' = 'natural'
) => {
  let enumType: NoteType;
  switch (type) {
    case 'natural':
      enumType = NoteType.NATURAL;
      break;
    case 'sharp':
      enumType = NoteType.SHARP;
      break;
    case 'flat':
      enumType = NoteType.FLAT;
      break;
    default:
      throw new Error(`Unrecognized note type "${type}"`);
  }
  return {
    name,
    type: enumType,
  };
};

export interface Scale {
  tonic: NoteIdentity;
  mode: Mode;
}

export const C_MAJOR: Scale = {
  tonic: createNote('C'),
  mode: 'major',
};
