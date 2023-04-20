import {
  useReducer,
  useEffect,
} from 'react';

import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { AppContext, initialAppContext } from './lib/contexts';
import { appReducer, AppActionKind } from './lib/reducers';

import Quiz from './pages/Quiz';
import QuizPage from './pages/QuizPage';
import History from './pages/History';
import Topbar from './components/Topbar';

import { supabase } from './lib/api';
import { User } from './lib/types';

function App() {
  const [state, reducerDispatch] = useReducer(appReducer, initialAppContext.data);
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

  return (
    <AppContext.Provider value={{ data: state, dispatch: reducerDispatch }}>
      <BrowserRouter>
        <Topbar />

        <Routes>
          <Route path="take-quiz" element={<Quiz />} />
          <Route path="take-quiz/:page" element={<QuizPage />} />
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
