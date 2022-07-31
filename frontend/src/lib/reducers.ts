import { AppContext } from './types';

export enum AppActionKind {
  LOGOUT = 'LOGOUT',
  LOAD_RESULTS = 'LOAD_RESULTS',
}

interface AppAction {
  type: AppActionKind;
  data: AppContext;
}

export function appReducer(state: AppContext, action: AppAction) {
  switch (action.type) {
    case AppActionKind.LOGOUT:
      return { ...state };
    case AppActionKind.LOAD_RESULTS:
      return { ...state, results: action.data.results };
    default:
      return state;
  }
}
