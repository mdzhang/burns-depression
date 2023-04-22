import {
  Answers, User, QuizResult, AppContext,
} from '@burns-depression/lib/types';
import { initialAppContext } from '@burns-depression/lib/contexts';
import { getScore, getLevelOfDepression } from '@burns-depression/utils/scoring';

export enum AppActionKind {
  LOGOUT = 'LOGOUT',
  LOAD_RESULTS = 'LOAD_RESULTS',
  LOAD_USER = 'LOAD_USER',
  UPDATE_CURRENT_ANSWERS = 'UPDATE_CURRENT_ANSWERS',
}

interface AppAction {
  type: AppActionKind;
  // like AppContext, but all optional
  data: {
    user?: User | null;
    results?: QuizResult[];
    currentAnswers?: Answers,
    currentLevelOfDepression?: string,
    currentTotal?: number,
  };
}

export function appReducer(state: AppContext, action: AppAction): AppContext {
  switch (action.type) {
    case AppActionKind.LOGOUT:
      return { ...state, ...initialAppContext.data };
    case AppActionKind.LOAD_RESULTS:
      return { ...state, results: action.data.results ?? [] };
    case AppActionKind.LOAD_USER:
      return { ...state, user: action.data.user ?? null };
    case AppActionKind.UPDATE_CURRENT_ANSWERS: {
      const answers = {
        ...state.currentAnswers,
        ...action.data.currentAnswers,
      };
      const newTotal = getScore(answers);
      const newLevel = getLevelOfDepression(newTotal);
      console.log('UPDATE_CURRENT_ANSWERS', answers, newTotal, newLevel);

      return {
        ...state,
        currentLevelOfDepression: newLevel,
        currentTotal: newTotal,
        currentAnswers: {
          ...state.currentAnswers,
          ...action.data.currentAnswers,
        },
      };
    }
    default:
      return state;
  }
}
