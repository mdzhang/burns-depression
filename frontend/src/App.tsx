import {
  useMemo, useContext, useEffect, useReducer,
} from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';

import Quiz from './pages/desktop/Quiz';
import History from './pages/desktop/History';
import Topbar from './components/Topbar';

import { supabase } from './lib/api';
import { AppContext, initialAppContext } from './lib/contexts';
import { appReducer } from './lib/reducers';

function App() {
  const appCtx = useContext(AppContext);
  const [state, dispatch] = useReducer(appReducer, initialAppContext.data);
  const providerValue = useMemo(() => ({ data: state, dispatch }), [appCtx.data]);

  useEffect(() => {
    const session = supabase.auth.session();
    appCtx.data.user = session?.user ?? null;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, sess) => {
        const currentUser = sess?.user;
        appCtx.data.user = currentUser ?? null;
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [appCtx.data.user]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={providerValue}>
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
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
