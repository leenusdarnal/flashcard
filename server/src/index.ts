import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import DeckModel from './models/Deck';
import { config } from 'dotenv';
import { getDecksController } from './controllers/getDecksController';
import { createDeckConoller } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { createCardForDeckConoller } from './controllers/createCardForDeckController';
import { getDeckController } from './controllers/getDeckController';
import { deleteCardOnDeckController } from './controllers/deleteCardOnDeckController';

config();
const app = express();

mongoose.connect(process.env.MONGO_URL || '').then(() => {
  console.log(`DB connected`);
  app.listen(process.env.PORT, () => {
    console.log(
      `server is running at PORT :${process.env.URL}:${process.env.PORT}`
    );
  });
});

app.use(cors());
app.use(express.json());

app.get('/decks', getDecksController);
app.delete('/decks/:deckId', deleteDeckController);
app.post('/decks', createDeckConoller);
app.post('/decks/:deckId/cards', createCardForDeckConoller);
app.get('/decks/:deckId', getDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeckController);
