import * as React from 'react';
import { C_MAJOR, NoteIdentity, ChordIdentity } from './theory/types';
import { notesForChord, getAllTriads } from './theory/chords';
import { parseNotes, ParseNoteError } from './parse';
import { noteEquals } from './theory/conversion';

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
        case 'dominant7':
          return '7';
        case 'major7':
          return 'maj7';
        case 'minor7':
          return 'm7';
        // default:
        //   throw new Error(`Unrecognized chord type "${chord.type}"`);
      }
      // return undefined;
    })()}
  </span>
);

const Triad = ({ chord }: { chord: ChordIdentity }) => (
  <React.Fragment>
    {' '}
    <strong>
      <ChordName chord={chord} />:
    </strong>{' '}
    {notesForChord(chord, C_MAJOR).map((y, i, arr) => (
      <React.Fragment key={i}>
        <Note note={y} />
        {i !== arr.length - 1 && ' '}
      </React.Fragment>
    ))}
  </React.Fragment>
);

interface AppState {
  filterNotesString: string;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    filterNotesString: '',
  };

  public render() {
    let filterNotes: NoteIdentity[] = [];
    let filterNotesError: ParseNoteError | undefined;
    try {
      filterNotes = parseNotes(this.state.filterNotesString);
    } catch (err) {
      if (err instanceof ParseNoteError) {
        filterNotesError = err;
      } else {
        throw err;
      }
    }
    const matchingTriads = ALL_TRIADS.filter(chord => {
      const chordNotes = notesForChord(chord, C_MAJOR);
      return filterNotes.every(filterNote =>
        chordNotes.some(chordNote => noteEquals(chordNote, filterNote))
      );
    });
    return (
      <div>
        <input
          type="text"
          value={this.state.filterNotesString}
          onChange={e => this.setState({ filterNotesString: e.target.value })}
        />
        {filterNotesError && (
          <div style={{ color: 'red' }}>{filterNotesError.message}</div>
        )}
        <h2>Matching triads</h2>
        <ul>
          {matchingTriads.map((x, i) => (
            <li key={i}>
              <Triad chord={x} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
