import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';

import styles from './App.module.css';
import Quiz from './pages/desktop/Quiz';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <header>
          <title>Burns Depression Checklist</title>
        </header>
        <Routes>
          <Route path="take-quiz" element={<Quiz />} />
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
