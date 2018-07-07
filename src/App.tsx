import * as React from 'react';
import * as _ from 'lodash';
import {
  MIDDLE_C,
  Interval,
  C_MAJOR,
  NoteIdentity,
  ChordIdentity,
} from './theory/types';
import { notesForChord } from './theory/chords';
import { absoluteNoteToIdentity } from './theory/conversion';

const ALL_TRIADS = _.flatMap(_.range(MIDDLE_C, Interval.OCTAVE), note => [
  {
    root: absoluteNoteToIdentity(note, C_MAJOR),
    type: 'major',
  },
  {
    root: absoluteNoteToIdentity(note, C_MAJOR),
    type: 'minor',
  },
]) as ChordIdentity[];
console.log(ALL_TRIADS);

const Note = ({ note }: { note: NoteIdentity }) => (
  <React.Fragment>
    {note.name}
    {(() => {
      switch (note.type) {
        case 'flat':
          return 'b';
        case 'sharp':
          return '#';
      }
      return undefined;
    })()}
  </React.Fragment>
);

const ChordName = ({ chord }: { chord: ChordIdentity }) => (
  <span>
    <Note note={chord.root} />
    {(() => {
      switch (chord.type) {
        case 'major':
          return undefined;
        case 'minor':
          return 'm';
      }
      return undefined;
    })()}
  </span>
);

class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>Every Triad Ever</h1>
        <ul>
          {ALL_TRIADS.map((x, i) => (
            <li key={i}>
              <strong>
                <ChordName chord={x} />:
              </strong>{' '}
              {notesForChord(x, C_MAJOR).map((y, i, arr) => (
                <React.Fragment key={i}>
                  <Note note={y} />
                  {i !== arr.length - 1 && ' '}
                </React.Fragment>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
