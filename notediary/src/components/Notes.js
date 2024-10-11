import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItems from './NoteItems';

export default function Notes() {
    const context = useContext(NoteContext)
    const { notes, setNotes } = context;
    return (
        <div>
            {notes.map((note) => {
                return <NoteItems note={note} />
            })}

        </div>
    )
}
