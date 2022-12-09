import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createDeck } from './api/createDecks';
import { deleteDeck } from './api/deleteDeck';
import { getDecks, TDeck } from './api/getDecks';

import './App.css';

function App() {
  const [decks, setdecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState('');

  const handleCreateDeck = async (event: React.FormEvent) => {
    event.preventDefault();

    const deck = await createDeck(title);
    setdecks([...decks, deck]);
    setTitle('');
  };
  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setdecks(decks.filter((deck) => deck._id !== deckId));
  };
  useEffect(() => {
    const fetchDecks = async () => {
      const allDecks = await getDecks();
      setdecks(allDecks);
    };
    fetchDecks();
  }, []);
  return (
    <div className='container'>
      <div className='App'>
        <h1>Your Decks</h1>
        <ul className='decks'>
          {decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor='deck-title'>Deck Title</label>
          <input
            id='deck-title'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
            value={title}
            placeholder='Enter title here'
          />
          <button>Create Deck</button>
        </form>
      </div>
    </div>
  );
}

export default App;
