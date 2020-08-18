const express = require('express');
const tokenAuthRouter = express.Router();
import { checkUserAuth } from '../controllers/auth-controllers';

tokenAuthRouter.get('/check-auth', checkUserAuth);

export default tokenAuthRouter;
