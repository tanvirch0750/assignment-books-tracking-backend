import express from 'express';
import bookRoutes from '../modules/books/book.route';
import userRoutes from '../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/book',
    route: bookRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
