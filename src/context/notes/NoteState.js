import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "630a565a1c1609de035fbf1d",
            "user": "630767ad116f3f988994fe56",
            "title": "Learn React",
            "description": "Learn React from code with herry from 52th video",
            "tag": "Learn",
            "date": "2022-08-27T17:37:30.923Z",
            "__v": 0
        },
        {
            "_id": "630a568e1c1609de035fbf1f",
            "user": "630767ad116f3f988994fe56",
            "title": "Learn React note 2 ",
            "description": "Learn React from code with herry from 52th video",
            "tag": "Learn",
            "date": "2022-08-27T17:38:22.376Z",
            "__v": 0
        }, {
            "_id": "630a565a1c1609de035fbf1d",
            "user": "630767ad116f3f988994fe56",
            "title": "Learn React",
            "description": "Learn React from code with herry from 52th video",
            "tag": "Learn",
            "date": "2022-08-27T17:37:30.923Z",
            "__v": 0
        }, {
            "_id": "630a565a1c1609de035fbf1d",
            "user": "630767ad116f3f988994fe56",
            "title": "Learn React",
            "description": "Learn React from code with herry from 52th video",
            "tag": "Learn",
            "date": "2022-08-27T17:37:30.923Z",
            "__v": 0
        }, {
            "_id": "630a565a1c1609de035fbf1d",
            "user": "630767ad116f3f988994fe56",
            "title": "Learn React",
            "description": "Learn React from code with herry from 52th video",
            "tag": "Learn",
            "date": "2022-08-27T17:37:30.923Z",
            "__v": 0
        }, {
            "_id": "630a565a1c1609de035fbf1d",
            "user": "630767ad116f3f988994fe56",
            "title": "Learn React",
            "description": "Learn React from code with herry from 52th video",
            "tag": "Learn",
            "date": "2022-08-27T17:37:30.923Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState