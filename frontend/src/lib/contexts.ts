import { createContext } from 'react';
import { User } from './types';

interface UserContextInterface {
  user: User | null;
}

export const initialUserContext = {
  user: null,
};

export const UserContext = createContext<UserContextInterface>(initialUserContext);
