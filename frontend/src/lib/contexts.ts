import { createContext, Dispatch } from 'react';
import { AppContext as AppContextType } from '@burns-depression/lib/types';
import questions from '@burns-depression/data/questions.json';
import ranges from '@burns-depression/data/ranges.json';

const initialAnswers = questions
  .map((c) => c.questions).flat().reduce((a, v) => ({ ...a, [v]: 0 }), {});

export interface AppContextInterface {
  dispatch: Dispatch<any>;
  data: AppContextType;
}

export const initialAppContext: AppContextInterface = {
  data: {
    user: null,
    results: [],
    currentAnswers: initialAnswers,
    currentLevelOfDepression: ranges[0].result,
    currentTotal: 0,
  },
  dispatch: () => {},
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

type Noop = () => void;
export const noop: Noop = () => undefined;

interface ScoringContextType {
  dispatch: Dispatch<any>;
}

export const QuizResultContext = createContext<ScoringContextType>({
  dispatch: noop,
});
