import React from "react";
import { useState } from "react";


function Form({onFrontStateChange, onBackStateChange, frontText, backText}) {
    // States that will be passed to the parents using the form 
    const [childStateFront, setChildStateFront] = useState('')
    const [childStateBack, setChildStateBack] = useState('')

    // When the inputs in the form change update the corresponding states
    const handelChangeFront= (event) => {
        const newValue = event.target.value;
        setChildStateFront(newValue)
        onFrontStateChange(newValue)
    }

    const handelChangeBack = (event) => {
        const newValue = event.target.value;
        setChildStateBack(newValue)
        onBackStateChange(newValue)
    }
    return (
        <>
            <label>
                Front
                <textarea type="text" id="test" name="test" value={frontText} onChange={handelChangeFront}/>
            </label>
            <br />
            <label>
                Back
                <textarea type="text" id="test" name="test" value ={backText} onChange={handelChangeBack}/>
            </label>
        </>
    )
}

export default Form;