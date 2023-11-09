import {
  useReducer,
  useEffect,
} from 'react';

import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { AppContext, initialAppContext } from '@burns-depression/lib/contexts';
import { appReducer, AppActionKind } from '@burns-depression/lib/reducers';

import Quiz from '@burns-depression/pages/Quiz';
import History from '@burns-depression/pages/History';
import Topbar from '@burns-depression/components/Topbar';

import { supabase } from '@burns-depression/lib/api';
import { User } from '@burns-depression/lib/types';

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
