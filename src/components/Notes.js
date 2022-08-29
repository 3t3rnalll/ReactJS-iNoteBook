import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NotesItem from './NotesItem';
import { useNavigate } from "react-router-dom"

const Notes = (props) => {
    const context = useContext(noteContext);
    const { fetchAllNotes, notes, updateNote } = context;
    const navigator = useNavigate();
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ noteId: "", noteTitleUpdate: "", noteDescUpdate: "", noteTagUpdate: "" })

    const editNote = (currentNote) => {
        ref.current.click()
        setNote({ noteId: currentNote._id, noteTitleUpdate: currentNote.title, noteDescUpdate: currentNote.description, noteTagUpdate: currentNote.tag })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        updateNote(note.noteId, note.noteTitleUpdate, note.noteDescUpdate, note.noteTagUpdate);
        ref.current.click()
        return props.showAlert('Note Edited successfully', 'success');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (localStorage.getItem('token'))
            fetchAllNotes();
        else
            navigator('/login')
        // eslint-disable-next-line
    }, [])




    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <hr />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ display: 'none' }}>
                Launch demo modal
            </button>

            <div >
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="noteTitleUpdate" name="noteTitleUpdate" value={note.noteTitleUpdate} onChange={onChange} />
                                    <label htmlFor="Description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="noteDescUpdate" name="noteDescUpdate" value={note.noteDescUpdate} onChange={onChange} />
                                    <label htmlFor="Tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="noteTagUpdate" name='noteTagUpdate' value={note.noteTagUpdate} onChange={onChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h2>Your Notes</h2>
                {notes.length === 0 && <h4>No note to display</h4>}
                {notes.map((note) => {
                    return <NotesItem key={note._id} editNote={editNote} note={note} showAlert={props.showAlert} />;
                })}
            </div>
        </div>
    )
}

export default Notes