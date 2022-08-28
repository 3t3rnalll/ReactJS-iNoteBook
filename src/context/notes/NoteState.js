import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial)

    //Fetch all notes
    const fetchAllNotes = async () => {
        //API Calls

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwNzY3YWQxMTZmM2Y5ODg5OTRmZTU2In0sImlhdCI6MTY2MTQ0Njk1MH0.d1ykfmtrHYfsq6MwCGjzZz_iywA14fZJTvZqgi7V0Wc'
            },
        });
        const json = await response.json()
        setNotes(json)
    }
    //Add a note
    const addNote = async (title, description, tag) => {
        //API Calls

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwNzY3YWQxMTZmM2Y5ODg5OTRmZTU2In0sImlhdCI6MTY2MTQ0Njk1MH0.d1ykfmtrHYfsq6MwCGjzZz_iywA14fZJTvZqgi7V0Wc'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        console.log(note);
        setNotes(notes.concat(note))

    }
    //Delete a note
    const deleteNote = async (id) => {
        // todo : API Calls
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwNzY3YWQxMTZmM2Y5ODg5OTRmZTU2In0sImlhdCI6MTY2MTQ0Njk1MH0.d1ykfmtrHYfsq6MwCGjzZz_iywA14fZJTvZqgi7V0Wc'
            },
        });
        console.log(await response.json());
        console.log('delete' + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    //Edit a note
    const updateNote = async (id, title, description, tag) => {
        //Api call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwNzY3YWQxMTZmM2Y5ODg5OTRmZTU2In0sImlhdCI6MTY2MTQ0Njk1MH0.d1ykfmtrHYfsq6MwCGjzZz_iywA14fZJTvZqgi7V0Wc'
            },
            body: JSON.stringify({ title, description, tag })
        });

        console.log(await response.json());

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState