import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
    const temp = useContext(NoteContext);

    useEffect(() => {
        temp.update();
    }, [])
    return (
        <div>
            This is about {temp.state.name}
        </div>
    );
}

export default About;
