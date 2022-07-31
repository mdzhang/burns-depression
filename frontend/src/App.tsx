import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';

import Quiz from './pages/desktop/Quiz';
import History from './pages/desktop/History';
import Topbar from './components/Topbar';

import { supabase } from './lib/api';
import { UserContext, initialUserContext } from './lib/contexts';

function App() {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const session = supabase.auth.session();
    userCtx.user = session?.user ?? null;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, sess) => {
        const currentUser = sess?.user;
        userCtx.user = currentUser ?? null;
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [userCtx.user]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={initialUserContext}>
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
