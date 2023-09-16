import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import { readCard, readDeck, updateCard } from "../utils/api";
import Form from "./Form";

function EditCard() {
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})

    // States to store the cards front and back of the card
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")

    // Get deckid from params
    const params = useParams()
    const deckId = Number(params.deckId)

    const cardId = Number(params.cardsId)

    // Find the deck with the deckId
    useEffect(() => {
        const ac = new AbortController()
        const fetchData = async () => {
            const responseDeck = await readDeck(deckId, ac.signal);
            setDeck(responseDeck);
            const responseCard = await (readCard)(cardId, ac.signal)
            setCard(responseCard)
            console.log(card.front)
        };
        fetchData();
        return () => ac.abort()
    }, []);

    // When card changes set front and back to the front and back of the card
    useEffect(() => {
        setFront(card.front)
        setBack(card.back)
    },[card])


    // When the submit button is clicked update the card with front and back then go the deck page
    const handleSubmit = async (event) => {
        event.preventDefault();
        updateCard({
            ...card,
            front: front,
            back: back,
        })
        .then((theCardUpdate) => history.push(`/decks/${deck.id}`))
    }


    // If the cancel button is clicked go to the decks page
    const history = useHistory()

    function cancelHandler() {
        history.push(`/decks/${deck.id}`)
    }


    // Whenever the inputs from the forms change updates the corresponding state
    const handleFrontChildStateChange = (childState) => {
        setFront(childState);
    }
    const handleBackChildStateChange = (childState) => {
        setBack(childState)
    }


 return (
    <div>
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Edit Card</li>
            </ol>
        </nav>
    </div>
    <div>
        <h2>Edit Card {card.id}</h2>
        <form onSubmit={handleSubmit}>
            <Form onFrontStateChange={handleFrontChildStateChange} onBackStateChange={handleBackChildStateChange} frontText={front} backText={back}/>
            <br />
            <button type="button" onClick={cancelHandler}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    </div>
</div> )
}


export default EditCard;