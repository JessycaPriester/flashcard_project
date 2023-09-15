import React, {useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch, useHistory } from "react-router-dom";
import "../App.css";

import { listDecks } from "../utils/api";
import Decks from "../Home/Decks";
import StudyDeck from "../Study/StudyDeck"
import ViewDeck from "../Study/ViewDeck";
import CreateDeck from "../Deck/CreateDeck";
import CreateCard from "../Deck/CreateCard";
import EditDeck from "../Deck/EditDeck";
import EditCard from "../Deck/EditCard";

function Layout() {
  // Handler for the Create Deck button
  const history = useHistory()
  function createHandler() {
    history.push('/decks/new')
  }


  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/">
            <button type="button" onClick={createHandler}>Create Deck</button>
            <Decks />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardsId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>        
      </div>
    </>
  );
}

export default Layout;
