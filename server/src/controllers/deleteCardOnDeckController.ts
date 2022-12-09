import { Request, Response } from 'express';
import DeckModel from '../models/Deck';

export const deleteCardOnDeckController = async (
  req: Request,
  res: Response
) => {
  const deckId = req.params.deckId;
  const index = req.params.index;
  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send(`No Deck of this id exits`);

  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  console.log(`Deck Card Modified with :${deckId}`);
  res.status(200).send(deck);
};
