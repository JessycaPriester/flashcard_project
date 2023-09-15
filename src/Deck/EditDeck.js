import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

import Form from "./Form";

function EditDeck() {
    const [deck, setDeck] = useState({})
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    // Get the deckId from params
    const params = useParams()
    const deckId = Number(params.deckId)
    console.log(deckId)

    // Get the deck with the matching id
    useEffect(() => {
        const ac = new AbortController()
        const fetchData = async () => {
            const response = await readDeck(deckId, ac.signal);
            setDeck(response);
        };
        fetchData();
        return () => ac.abort()
    }, []);

    // Set the name and description from the deck to the corresponding state
    useEffect(() => {
        setName(deck.name)
        setDescription(deck.description)
    }, [deck])


    // If the cancel button is clicked go to the deck page
    const history = useHistory()

    function cancelHandler() {
        history.push(`/decks/${deckId}`)
    }

    // When the inputs from the form change update the corresponding state
    const handleNameChange = (event) => setName(event.target.value)

    const handleDescriptionChange = (event) => setDescription(event.target.value)

    // When the submit button is pressed update the deck and go to the deck page
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(name, description)
        updateDeck({
            ...deck,
            name: name,
            description: description,
        })
        .then((theDeckUpdate) => history.push(`/decks/${deck.id}`))
    }

 return (
    <div>
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
        </nav>
    </div>
    <div>
        <h2>Edit Deck</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input type="text" id="name" name="front" onChange={handleNameChange} value={name}/>
            </label>
            <br />
            <label>
                Description
                <textarea type="text" id="description" name="description" onChange={handleDescriptionChange} value={description}/>
            </label>
            <br />
            <button type="button" onClick={cancelHandler}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    </div>
</div> )
}

export default EditDeck