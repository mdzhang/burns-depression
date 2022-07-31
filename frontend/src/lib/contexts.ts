import { createContext } from 'react';
import { User } from './types';

interface AppContextInterface {
  user: User | null;
}

export const initialAppContext = {
  user: null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);
