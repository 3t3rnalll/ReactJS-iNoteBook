import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ noteTitle: "", noteDesc: "", noteTag: "" })

    const handleClick = async (e) => {
        e.preventDefault()
        await addNote(note.noteTitle, note.noteDesc, note.noteTag === '' ? 'default' : note.noteTag);
        setNote({ noteTitle: "", noteDesc: "", noteTag: "" })
        props.showAlert('Note is Added successfully', 'success')
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div >
            <h2 style={{ paddingTop: '140px' }}>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="noteTitle" name="noteTitle" value={note.noteTitle} onChange={onChange} required />
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="noteDesc" name="noteDesc" value={note.noteDesc} onChange={onChange} required />
                    <label htmlFor="Tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="noteTag" name='noteTag' value={note.noteTag} onChange={onChange} required />
                </div>
                <button disabled={note.noteTitle.length < 5 || note.noteDesc.length < 7} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote