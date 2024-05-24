import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    const s1 = {
        "name": "Neeraj",
        "position": "MTO"
    };

    const [state, setState] = useState(s1);


    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Neeraj Kumar",
                "position": "MTO SE"
            })
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;
