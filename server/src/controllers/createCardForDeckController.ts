import { Request, Response } from 'express';
import DeckModel from '../models/Deck';

export const createCardForDeckConoller = async (
  req: Request,
  res: Response
) => {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send(`No Deck of this id exits`);
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();
  console.log(`card created to ${deckId}`);

  res.status(200).send(deck);
};
