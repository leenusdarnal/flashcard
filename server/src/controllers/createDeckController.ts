import { Request, Response } from 'express';
import DeckModel from '../models/Deck';

export const createDeckConoller = async (req: Request, res: Response) => {
  const { title } = req.body;
  const newDeck = new DeckModel({ title });
  const creaedDeck = await newDeck.save();
  console.log('Deck Created in server');

  res.status(200).send(creaedDeck);
};
