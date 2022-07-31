import { Reducer } from 'react';

export const NOOP = 'NOOP';

// eslint-disable-next-line max-len
export const withLocalStorageCache = (reducer: Reducer<any, any>, cacheKey: string) => (state: any, action: any) => {
  const newState = reducer(state, action);
  localStorage.setItem(cacheKey, JSON.stringify(newState));
  return newState;
};
