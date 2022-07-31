import { User, QuizResult, AppContext } from './types';
import { initialAppContext } from './contexts';

export enum AppActionKind {
  LOGOUT = 'LOGOUT',
  LOAD_RESULTS = 'LOAD_RESULTS',
  LOAD_USER = 'LOAD_USER',
}

interface AppAction {
  type: AppActionKind;
  // like AppContext, but all optional
  data: {
    user?: User | null;
    results?: QuizResult[];
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
    default:
      return state;
  }
}
