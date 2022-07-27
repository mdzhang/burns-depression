import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';

import styles from './App.module.css';
import Quiz from './pages/desktop/Quiz';
import Auth from './components/Auth';
import { supabase } from './lib/api';

type User = {
  id: string
  email?: string
}

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
      <div className={styles.container}>
        <header>
          <title>Burns Depression Checklist</title>
        </header>
        <Routes>
          <Route path="take-quiz" element={<Quiz />} />
          <Route path="login" element={<Auth />} />
          <Route
            path="*"
            element={<Navigate to="/take-quiz" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
