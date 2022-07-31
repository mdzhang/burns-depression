import { createContext, Dispatch } from 'react';
import { AppContext as AppContextType } from './types';

export interface AppContextInterface {
  dispatch: Dispatch<any>;
  data: AppContextType;
}

export const initialAppContext: AppContextInterface = {
  data: {
    user: null,
    results: [],
  },
  dispatch: () => {},
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);
