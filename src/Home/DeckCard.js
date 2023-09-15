import React from "react"
import {Link} from "react-router-dom"

import { deleteDeck } from "../utils/api"

function DeckCard({deck}) {
    // Get information from deck
    const title = deck.name
    const {description} = deck
    const numOfCards = deck.cards.length
    const {id} = deck

    //If delete button is pressed display prompt. Prompt confirmed delete deck and refresh page
    function deleteHandler() {
        if (window.confirm("Delete this deck? You will not be able to recover it.")){
            deleteDeck(id)
            window.location.reload()
       } 
    }

return (
    <div className="card" key={deck.id}>
        <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <h6 className="card-subtitle mb-2 text-muted">{numOfCards} cards</h6>
            <p className="card-description">{description}</p>
            <Link to={`/decks/${id}`}>
                <button type="button">View</button>
            </Link>
            <Link to={`/decks/${id}/study`}>
                <button type="button">Study</button>
            </Link>
            <button type="button" onClick={deleteHandler}>Delete</button>
        </div>
        <br/>
    </div>
);
}

export default DeckCard;