import { Request, Response } from 'express';
import DeckModel from '../models/Deck';

export const getDecksController = async (req: Request, res: Response) => {
  const decks = await DeckModel.find();
  console.log(` All Data fetch `);
  res.json(decks);
};
