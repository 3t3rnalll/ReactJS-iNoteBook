import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NotesItem from './NotesItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;

    return (
        <div>
            <hr />
            <div className="row">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NotesItem note={note} />;
                })}
            </div>
        </div>
    )
}

export default Notes