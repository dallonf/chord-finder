import * as React from 'react';
import * as _ from 'lodash';
import { MIDDLE_C, Interval, C_MAJOR, NoteIdentity } from './theory/types';
import { majorTriad } from './theory/chords';
import { absoluteNoteToIdentity } from './theory/conversion';

const ALL_TRIADS = _.flatMap(_.range(MIDDLE_C, Interval.OCTAVE), note => [
  {
    root: absoluteNoteToIdentity(note, C_MAJOR),
    type: 'major',
    notes: majorTriad(note).map(x => absoluteNoteToIdentity(x, C_MAJOR)),
  },
]);
console.log(ALL_TRIADS);

const Note = ({ note }: { note: NoteIdentity }) => (
  <span>
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
                <Note note={x.root} />:
              </strong>{' '}
              {x.notes.map((y, i) => (
                <React.Fragment key={i}>
                  <Note note={y} />
                  {i !== x.notes.length - 1 && ' '}
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
