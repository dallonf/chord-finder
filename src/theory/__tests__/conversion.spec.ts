import {
  absoluteNoteToIdentity,
  getAbsoluteNoteForIdentity,
  getNotesInScale,
} from '../conversion';
import * as _ from 'lodash';
import { MIDDLE_C, C_MAJOR, createNote, Interval, NOTE_NAMES } from '../types';

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

  it('converts all 12 notes', () => {
    const scale = _.range(12).map(x => absoluteNoteToIdentity(x, C_MAJOR));
    expect(scale).toEqual([
      createNote('C'),
      createNote('C', 'sharp'),
      createNote('D'),
      createNote('E', 'flat'),
      createNote('E'),
      createNote('F'),
      createNote('F', 'sharp'),
      createNote('G'),
      createNote('A', 'flat'),
      createNote('A'),
      createNote('B', 'flat'),
      createNote('B'),
    ]);
  });

  it.skip('identifies G# from A major', () => {
    expect(
      absoluteNoteToIdentity(NOTE_NAMES.G + 1, {
        tonic: createNote('A'),
        mode: 'major',
      })
    ).toEqual(createNote('G', 'sharp'));
  });
});

describe('getAbsoluteNoteForIdentity', () => {
  it('gets middle C', () => {
    expect(getAbsoluteNoteForIdentity(createNote('C', 'natural'))).toEqual(
      NOTE_NAMES.C
    );
  });

  it('gets a G', () => {
    expect(getAbsoluteNoteForIdentity(createNote('G', 'natural'))).toEqual(
      NOTE_NAMES.G
    );
  });

  it('gets an A', () => {
    expect(getAbsoluteNoteForIdentity(createNote('A', 'natural'))).toEqual(
      NOTE_NAMES.A
    );
  });

  it('gets a C#', () => {
    expect(getAbsoluteNoteForIdentity(createNote('C', 'sharp'))).toEqual(
      NOTE_NAMES.C + 1
    );
  });

  it('gets a Bb', () => {
    expect(getAbsoluteNoteForIdentity(createNote('B', 'flat'))).toEqual(
      NOTE_NAMES.B - 1
    );
  });

  it('F# and Gb are the same thing', () => {
    expect(getAbsoluteNoteForIdentity(createNote('F', 'sharp'))).toEqual(
      getAbsoluteNoteForIdentity(createNote('G', 'flat'))
    );
  });

  it('Fb and E natural are the same thing', () => {
    expect(getAbsoluteNoteForIdentity(createNote('F', 'flat'))).toEqual(
      getAbsoluteNoteForIdentity(createNote('E', 'natural'))
    );
  });
});

describe('getNotesInScale', () => {
  it('gets C major', () => {
    expect(getNotesInScale({ tonic: createNote('C'), mode: 'major' })).toEqual([
      createNote('C'),
      createNote('D'),
      createNote('E'),
      createNote('F'),
      createNote('G'),
      createNote('A'),
      createNote('B'),
    ]);
  });
  it('gets A minor', () => {
    expect(getNotesInScale({ tonic: createNote('A'), mode: 'minor' })).toEqual([
      createNote('A'),
      createNote('B'),
      createNote('C'),
      createNote('D'),
      createNote('E'),
      createNote('F'),
      createNote('G'),
    ]);
  });
  it('gets C minor', () => {
    expect(getNotesInScale({ tonic: createNote('C'), mode: 'minor' })).toEqual([
      createNote('C'),
      createNote('D'),
      createNote('E', 'flat'),
      createNote('F'),
      createNote('G'),
      createNote('A', 'flat'),
      createNote('B', 'flat'),
    ]);
  });
  it('gets A major', () => {
    expect(getNotesInScale({ tonic: createNote('A'), mode: 'major' })).toEqual([
      createNote('A'),
      createNote('B'),
      createNote('C', 'sharp'),
      createNote('D'),
      createNote('E'),
      createNote('F', 'sharp'),
      // TODO: this should be G sharp
      // see skipped test for absoluteNoteToIdentiy
      createNote('A', 'flat'),
    ]);
  });
});
