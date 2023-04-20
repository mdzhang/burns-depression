import { useContext, useState } from 'react';
import { supabase } from '../lib/api';
import { AppContext } from '../lib/contexts';
import { Answers, getScore, getLevelOfDepression } from '../utils/scoring';
import questions from '../data/questions.json';

export default function useSubmitScore() {
  const { data: { user } } = useContext(AppContext);
  const [total, setTotal] = useState<number>(0);
  const [levelOfDepression, setLevelOfDepression] = useState<string | undefined>(undefined);

  const initialAnswers = questions
    .map((c) => c.questions).flat().reduce((a, v) => ({ ...a, [v]: 0 }), {});

  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const submitScore = async () => {
    const newTotal = getScore(answers);
    setTotal(newTotal);

    const newLevel = getLevelOfDepression(newTotal);
    setLevelOfDepression(newLevel);

    // store locally
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const result = {
      date,
      raw: answers,
      total: newTotal,
    };

    window.localStorage.setItem(`result_${date}`, JSON.stringify(result));

    // store remotely if logged in
    if (user) {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([
          {
            user_id: user.id,
            result: JSON.stringify(answers),
          },
        ]);

      if (error) {
        // eslint-disable-next-line no-console
        console.warn('Error saving results', error);
      } else {
        // eslint-disable-next-line no-console
        console.info('Saved results', data);
      }
    }
  };
  return {
    submitScore,
    total,
    answers,
    setAnswers,
    levelOfDepression,
  };
}
