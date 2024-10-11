import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const initialNotes = [
        {
            "user": "6708b4cf555396bb36aa37a2",
            "title": "to do",
            "description": "Complete today",
            "tag": "General",
            "_id": "6708b7ac281cc2afe51737c4",
            "date": "2024-10-11T05:29:16.244Z",
            "__v": 0
        },
        {
            "user": "6708b4cf555396bb36aa37a2",
            "title": "to do",
            "description": "Complete today",
            "tag": "General",
            "_id": "6708b7ac281cc2afe51737c4",
            "date": "2024-10-11T05:29:16.244Z",
            "__v": 0
        },
        {
            "user": "6708b4cf555396bb36aa37a2",
            "title": "to do",
            "description": "Complete today",
            "tag": "General",
            "_id": "6708b7ac281cc2afe51737c4",
            "date": "2024-10-11T05:29:16.244Z",
            "__v": 0
        },
        {
            "user": "6708b4cf555396bb36aa37a2",
            "title": "to do",
            "description": "Complete today",
            "tag": "General",
            "_id": "6708b7ac281cc2afe51737c4",
            "date": "2024-10-11T05:29:16.244Z",
            "__v": 0
        },
        {
            "user": "6708b4cf555396bb36aa37a2",
            "title": "to do",
            "description": "Complete today",
            "tag": "General",
            "_id": "6708b7ac281cc2afe51737c4",
            "date": "2024-10-11T05:29:16.244Z",
            "__v": 0
        },
        {
            "user": "6708b4cf555396bb36aa37a2",
            "title": "to do",
            "description": "Complete today",
            "tag": "General",
            "_id": "6708b7ac281cc2afe51737c4",
            "date": "2024-10-11T05:29:16.244Z",
            "__v": 0
        },
        {
            "user": "6708b4cf555396bb36aa37a2",
            "title": "to do",
            "description": "Complete today",
            "tag": "General",
            "_id": "6708b7ac281cc2afe51737c4",
            "date": "2024-10-11T05:29:16.244Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialNotes);

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;