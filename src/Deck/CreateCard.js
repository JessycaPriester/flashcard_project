import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { createCard, readDeck } from "../utils/api";
import Form from "./Form";


function CreateCard() {
    const [deck, setDeck] = useState({})
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")

    // Get id for deck from params
    const params = useParams()
    const deckId = Number(params.deckId)

    // Fetch the deck with the matching id
    useEffect(() => {
        const ac = new AbortController()
        const fetchData = async () => {
            const responseDeck = await readDeck(deckId, ac.signal);
            setDeck(responseDeck);
        };
        fetchData();
        return () => ac.abort()
    }, [])

    // If the done button is clicked return user to the deck screen
    const history = useHistory()

    function doneHandler() {
        history.push(`/decks/${deckId}`)
    }

    // If submit is clicked creates card resets the page
    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = await createCard(deckId, {front, back})
        window.location.reload()

    }

    // If the text in the textareas changes it changes the value of the corresponding state
    const handleFrontChildStateChange = (childState) => {
        setFront(childState);
    }
    const handleBackChildStateChange = (childState) => {
        setBack(childState)
    }


    return(
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active">Add Card</li>
                    </ol>
                </nav>
            </div>
            <div>
                <h2>{deck.name}: Add Card</h2>
                <form onSubmit={handleSubmit}>
                    <Form onFrontStateChange={handleFrontChildStateChange} onBackStateChange={handleBackChildStateChange}/>
                    <button type="button" onClick={doneHandler}>Done</button>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCard
