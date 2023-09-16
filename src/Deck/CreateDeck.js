import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"

import { createDeck } from "../utils/api"


function CreateDeck(decksLength) {
    const [ name, setName] = useState("")
    const [ description, setDescription] = useState("")

    // If the cancel button is clicked will return to homescreen
    const history = useHistory()

    function cancelHandler() {
        history.push('/')
    }

    // If the text in the input box changes updates the corresponding states
    const handleNameChange = (event) => setName(event.target.value)

    const handleDescriptionChange = (event) => setDescription(event.target.value)

    // If the submit button is clicked will create deck and change to the deck screen 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const deck = await createDeck({name, description})
        history.push(`/decks/${deck.id}`)
    }
    
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name
                    <input type="text" id="name" name="name" onChange={handleNameChange} />
                </label>
                <br />
                <label htmlFor="Description">
                    Description
                    <textarea type="text" id="description" name="description" onChange={handleDescriptionChange}/>
                </label>
                <br />
                <button type="button" onClick={cancelHandler}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;