import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { WishlistController } from './wishlist.controller';
import { createWishlistZodSchema } from './wishlist.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(createWishlistZodSchema),
  auth(ENUM_USER_ROLE.USER),
  WishlistController.createWishlist
);

router.get('/', WishlistController.getAllWishlist);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  WishlistController.deleteWishlist
);

export default router;
