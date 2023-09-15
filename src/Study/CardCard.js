import React from "react"
import {Link, useRouteMatch} from "react-router-dom"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"

import { deleteCard } from "../utils/api"

function CardCard({card}) {
    // Collect text/values from the front and back of the card
    const question = card.front
    const answer = card.back

    // Get the deckId and cardId from params
    const params = useParams()
    const deckId = params.deckId
    const cardId = card.id

    // If the edit button is pressed go to the cards edit screen
    const history = useHistory()

    function routeChange() {
        let path = `/decks/${deckId}/cards/${cardId}/edit`
        history.push(path)
    }

    // If the delete button is pressed return prompt. Prompt confirmed delete card and refresh page
    function deleteHandler() {
        if (window.confirm("Delete this card? You will not be able to recover it.")){
            deleteCard(cardId)
            window.location.reload()
       } 
    }

return (
    <div className="card" key={cardId}>
        <div className="card-body">
            <p className="card-text">{question}</p>
            <p className="card-text">{answer}</p>
            <button type="button" onClick={routeChange}>Edit</button>
            <button type="button" onClick={deleteHandler}>Delete</button>
        </div>
        <br/>
    </div>
);
}

export default CardCard;