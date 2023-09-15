import React, { useState, useEffect } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import { readDeck } from "../utils/api"


function StudyDeck() {
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    const [cardNum, setCardNum] = useState(1)
    const [text, setText] = useState("")
    const [showAnswer, setShowAnswer] = useState(true)

    // Get deck id from params
    const params = useParams()
    const deckId = params.deckId

    // Get the deck with the matching id and store it and its cards in the corresponding states
    useEffect(() => {
        const ac = new AbortController()
        const fetchData = async () => {
          const response = await readDeck(deckId, ac.signal);
          setDeck(response);
          setCards(response.cards)
         };
         fetchData();
         return () => ac.abort()
      }, [deckId])

      // Set text to the front of the card and show the front of the card everytime the card changes
      useEffect(() => {
        if (cards.length > 0) {
          setText(cards[0].front);
          setShowAnswer(false)
        }
      }, [cards]);

      // Increase the index of the card by 1 everytime cardNum changes
      useEffect(() => {
        const index = cardNum - 1
        if (cards.length > 0) {
            setText(cards[index].front)
        }      
    }, [cardNum, cards])


    // When the next button is clicked go to the next card and display the front
    // If no more cards return prompt. If confirmed restart cards. If denied return home
    const history = useHistory()

    function nextHandler() {
        if (cardNum < cards.length) {
            setCardNum(cardNum + 1)
            setShowAnswer(false)
        } else {
            if (window.confirm("Restart cards? Click cancel to return to home page")) {
                setCardNum(1)
                setShowAnswer(false)
            } else {
                history.push("/")
            }
        }
    }

    // When flip button is pressed display the oppoiste side if the card
    const flipHandler = () => {
      if (showAnswer) {
        setShowAnswer(false)
        setText(cards[cardNum - 1].front)
      } else {
        setShowAnswer(true)
        setText(cards[cardNum - 1].back)
      }
    }

    // When add card button is pressed go to add cards screen 
    function addHandler() {
        history.push(`/decks/${deck.id}/cards/new`)
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Study</li>
                </ol>
            </nav>
            <h2>Study: {deck.name}</h2>
            <div>
                {cards.length >= 3 ? (
                    <div className="card">
                        <div className="card-body">
                            <h3>Card {cardNum} of {cards.length}</h3>
                            <p className="card-text">{text}</p> 
                            <button type="button" onClick={flipHandler}>Flip</button>
                            {showAnswer && <button type="button" onClick={nextHandler}>Next</button>}
                        </div>
                    </div>

                ) :
                    <div>
                        <h2>Not enough cards.</h2>
                        <p>You need at least 3 cards to study. There are {cards.length} in this deck</p>
                        <button type="button" onClick={addHandler}>Add Cards</button>
                    </div>
                }
            </div>




        </div>
    )

}

export default StudyDeck;