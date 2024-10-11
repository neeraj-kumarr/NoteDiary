import React from 'react'
import NoteItems from './NoteItems'
import Notes from './Notes'
import NoteState from '../context/notes/NoteState'

const Home = () => {
    return (
            <div>
                <p>This is home</p>
                <Notes />
            </div>
    )
}

export default Home
