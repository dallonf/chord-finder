import * as React from 'react';
import {
  C_MAJOR,
  NoteIdentity,
  ChordIdentity,
} from './theory/types';
import { notesForChord, getAllTriads } from './theory/chords';

const ALL_TRIADS = getAllTriads();

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
        <h1>Lots of triads</h1>
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
