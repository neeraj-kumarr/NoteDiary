import React,{useContext,useEffect} from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
    const temp = useContext(NoteContext);

    useEffect(() => {
        temp.update()
    }, [])
    
    return (
        <div>
            {/* This is about {temp.name} */}
            This is about {temp.value.name} and he is {temp.value.class}
        </div>
    );
}

export default About;
