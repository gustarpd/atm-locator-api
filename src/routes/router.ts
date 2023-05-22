import { Router } from 'express';
import { ATMLocationController } from '../controllers/atm-locations-controller';
import { CreatenewUserController } from '../controllers/user-controller';
import { Private } from '../../src/middlewares/auth';
import { ATMFavoriteController } from '../controllers/atm-favorites-controller';

export const router = Router();

router.get('/atm', Private, new ATMLocationController().getTMS);
router.post('/create-new-user', new CreatenewUserController().create);
router.post('/favorites', Private, new ATMFavoriteController().create);
router.post('/authenticate', new CreatenewUserController().authenticate);
router.post('/me/', Private, new CreatenewUserController().me);
router.delete('/delete-favorites/:id', Private, new ATMFavoriteController().delete)
router.get('/get-all-atms/', Private, new ATMFavoriteController().getAllAMTFavorites)