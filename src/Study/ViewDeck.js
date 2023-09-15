import React, { useState, useEffect } from "react"
import { useParams, Link, Route } from "react-router-dom"
import { readDeck } from "../utils/api"

import CardCard from "./CardCard"
import { deleteDeck } from "../utils/api"
import { Switch, useHistory, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min"

function ViewDeck() {
    // Set state to store deck in
    const [deck, setDeck] = useState({})
    // Set the state to store the cards from the deck in
    const [cardDeck, setCardDeck] = useState([])

    // Find the deckId 
    const params = useParams()
    const {deckId} = params

    // Find the deck with the deckId
    useEffect(() => {
        const ac = new AbortController()
        const fetchData = async () => {
          const response = await readDeck(deckId, ac.signal);
          setDeck(response);
          setCardDeck(response.cards)
         };
         fetchData();
         return () => ac.abort()
      }, [deckId]);


    // When deck edit button is clicked go to the deck edit screen
    const history = useHistory()

    function editHandler() {
        const path = `/decks/${deckId}/edit`
        history.push(path)
    }

    // When study button is clicked go to the study screen
    function studyHandler() {
        const path = `/decks/${deckId}/study`
        history.push(path)
    }

    // When add cards button is clicked go to new cards screen
    function addHandler() {
        const path = `/decks/${deckId}/cards/new`
        history.push(path)
    }

    // When the delete deck button is pressed return prompt. If confirmed delete deck and go to home
    function deleteHandler() {
        if (window.confirm("Delete this deck? You will not be able to recover it.")){
            deleteDeck(deck.id)
            history.push("/")
       } 
    }

    return(
        <div>
            
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </ol>
            </nav>
            <div>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <button type="button" onClick={editHandler}>Edit</button>
                <button type="button" onClick={studyHandler}>Study</button>
                <button type="button" onClick={addHandler}>Add Cards</button>
                <button type="button" onClick={deleteHandler}>Delete</button>
            </div>
            <br />
            <div>
                <h2>Cards</h2>
                <section>
                    {cardDeck.map((card) => (
                        <CardCard card={card} />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default ViewDeck