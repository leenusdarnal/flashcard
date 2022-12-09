import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { createCard } from './api/createCard';
import { deleteCard } from './api/deleteCard';
import { getDeck } from './api/getDeck';
import { TDeck } from './api/getDecks';

import './Deck.css';

const Deck = () => {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState('');
  const { deckId } = useParams();

  const handleCreateDeck = async (event: React.FormEvent) => {
    event.preventDefault();
    if (text === '') return;
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText('');
  };
  const handleDeleteCard = async (index: number) => {
    if (!deckId) return;
    const newdeck = await deleteCard(deckId, index);
    setCards(newdeck.cards);
  };
  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;
      const newdeck = await getDeck(deckId);
      setDeck(newdeck);
      setCards(newdeck.cards);
    };
    fetchDeck();
  }, [deckId]);
  return (
    <div className='Deck'>
      <h1>{deck?.title}</h1>
      <ul className='cards'>
        {cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='card-title'>Card Title</label>
        <input
          id='deck-title'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
          }}
          value={text}
          placeholder='Enter title here'
        />
        <button>Create Cards</button>
      </form>
    </div>
  );
};

export default Deck;
