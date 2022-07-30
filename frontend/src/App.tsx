import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';

import Quiz from './pages/desktop/Quiz';
import History from './pages/desktop/History';
import Topbar from './components/Topbar';

import { supabase } from './lib/api';
import { User } from './lib/types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, sess) => {
        const currentUser = sess?.user;
        setUser(currentUser ?? null);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  return (
    <BrowserRouter>
      <Topbar user={user} />

      <Routes>
        <Route path="take-quiz" element={<Quiz user={user} />} />
        <Route
          path="history"
          element={<History user={user} />}
        />
        <Route
          path="*"
          element={<Navigate to="/take-quiz" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
