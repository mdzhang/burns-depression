import {
  useReducer,

  useEffect,
} from 'react';

import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { AppContext, initialAppContext } from './lib/contexts';
import { appReducer, AppActionKind } from './lib/reducers';
import { withLocalStorageCache } from './utils/caching';

import Quiz from './pages/Quiz';
import History from './pages/History';
import Topbar from './components/Topbar';

import { supabase, saveResults } from './lib/api';
import { User, QuizResult } from './lib/types';

function App() {
  const localState = localStorage.getItem('app');
  const [state, reducerDispatch] = useReducer(
    withLocalStorageCache(appReducer, 'app'),
    localState ? JSON.parse(localState) : initialAppContext.data,
  );
  const setUser = (u: User | undefined | null) => {
    reducerDispatch({ type: AppActionKind.LOAD_USER, data: { user: u ?? null } });
  };

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, sess) => {
        setUser(sess?.user);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [state.user]);

  useEffect(() => {
    const { user, results } = state;
    const unsavedResults = results.filter((r: QuizResult) => !r.id);
    if (!user || unsavedResults.length === 0) { return; }

    const { data } = saveResults(user, unsavedResults);
    console.log(data);
    debugger;
    const mergedResults = results;
    reducerDispatch({
      type: AppActionKind.LOAD_RESULTS,
      data: { results: mergedResults },
    });
  }, []);

  return (
    <AppContext.Provider value={{ data: state, dispatch: reducerDispatch }}>
      <BrowserRouter>
        <Topbar />

        <Routes>
          <Route path="take-quiz" element={<Quiz />} />
          <Route
            path="history"
            element={<History />}
          />
          <Route
            path="*"
            element={<Navigate to="/take-quiz" replace />}
          />
        </Routes>
      </BrowserRouter>

    </AppContext.Provider>
  );
}

export default App;
