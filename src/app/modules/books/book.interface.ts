import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';

export type IStatus = 'reading' | 'soon' | 'finished';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  reviews: string[];
  wishlist: boolean;
  status: IStatus;
  image: string;
  addedBy: Types.ObjectId | IUser;
  id?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
