import { majorTriad, minorTriad } from '../chords';
import {
  getAbsoluteNoteForIdentity,
  absoluteNoteToIdentity,
} from '../conversion';
import { createNote, C_MAJOR } from '../types';

it('C', () => {
  const chord = majorTriad(getAbsoluteNoteForIdentity(createNote('C')));
  expect(chord.map(x => absoluteNoteToIdentity(x, C_MAJOR))).toEqual([
    createNote('C'),
    createNote('E'),
    createNote('G'),
  ]);
});

it('G', () => {
  const chord = majorTriad(getAbsoluteNoteForIdentity(createNote('G')));
  expect(chord.map(x => absoluteNoteToIdentity(x, C_MAJOR))).toEqual([
    createNote('G'),
    createNote('B'),
    createNote('D'),
  ]);
});

it('Am', () => {
  const chord = minorTriad(getAbsoluteNoteForIdentity(createNote('A')));
  expect(chord.map(x => absoluteNoteToIdentity(x, C_MAJOR))).toEqual([
    createNote('A'),
    createNote('C'),
    createNote('E'),
  ]);
});

it('Dm', () => {
  const chord = minorTriad(getAbsoluteNoteForIdentity(createNote('D')));
  expect(chord.map(x => absoluteNoteToIdentity(x, C_MAJOR))).toEqual([
    createNote('D'),
    createNote('F'),
    createNote('A'),
  ]);
});
