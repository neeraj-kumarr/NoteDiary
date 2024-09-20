import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const state = {
        "name": "Neeraj",
        "class": "Graduate",
    }
    const [value, setValue] = useState(state);


    const update = () => {
        setTimeout(() => {
            setValue({
                "name": "Sahil",
                "class": "PostGrad"
            })
        }, 2000);
    }

    return (
        <NoteContext.Provider value={{ value, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
