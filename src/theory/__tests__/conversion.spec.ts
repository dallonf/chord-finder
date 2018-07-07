import { absoluteNoteToIdentity } from '../conversion';
import { MIDDLE_C, C_MAJOR, createNote, Interval } from '../types';

describe('absoluteNoteToIdentity', () => {
  it('converts middle C', () => {
    expect(absoluteNoteToIdentity(MIDDLE_C, C_MAJOR)).toEqual(
      createNote('C', 'natural')
    );
  });

  it('converts G', () => {
    expect(
      absoluteNoteToIdentity(MIDDLE_C + Interval.PERFECT_FIFTH, C_MAJOR)
    ).toEqual(createNote('G', 'natural'));
  });

  it('converts A', () => {
    expect(absoluteNoteToIdentity(-3, C_MAJOR)).toEqual(
      createNote('A', 'natural')
    );
  });

  it('converts octave C', () => {
    expect(absoluteNoteToIdentity(MIDDLE_C + Interval.OCTAVE, C_MAJOR)).toEqual(
      createNote('C', 'natural')
    );
  });
});
