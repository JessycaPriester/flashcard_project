import React, { useEffect, useState } from "react"
import { listDecks } from "../utils/api"

import DeckCard from "./DeckCard";


function Decks() {
    const [decks, setDecks] = useState([]);

    const [error, setError] = useState(undefined);

    // Get all the decks and store in decks state
    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setDecks).catch(setError);
        return () => abortController.abort();
    }, []);

    return (
        <section>
                {decks.map((deck) => (
                    <DeckCard deck={deck} />  
                ))}
        </section>
    );
}

export default Decks;