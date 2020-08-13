import express from 'express';
import { check } from 'express-validator';
import { getEvents } from '../controllers/event-controllers';

const eventRouter = express.Router();

eventRouter.get('/', getEvents);

export default eventRouter;
