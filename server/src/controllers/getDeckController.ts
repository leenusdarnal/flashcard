import { Request, Response } from 'express';
import DeckModel from '../models/Deck';

export const getDeckController = async (req: Request, res: Response) => {
  const { deckId } = req.params;
  const deck = await DeckModel.findById(deckId);
  console.log(`Deck with ID:${deckId} fetched`);
  res.json(deck);
};
