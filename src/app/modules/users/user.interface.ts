/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  userName: string;
  email: string;
  password: string;
  role: string;
};

// instance methods
export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

// static methods
export interface UserModel
  extends Model<IUser, Record<string, never>, IUserMethods> {
  isUserExist(email: string): Promise<IUser | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}
