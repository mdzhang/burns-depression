import { useContext } from 'react';
import { supabase } from '@burns-depression/lib/api';
import { AppContext } from '@burns-depression/lib/contexts';
import { Answers } from '@burns-depression/lib/types';
import { AppActionKind } from '@burns-depression/lib/reducers';

export default function useSubmitScore() {
  const {
    data: {
      user,
      currentAnswers,
      currentTotal,
      currentLevelOfDepression,
    },
    dispatch,
  } = useContext(AppContext);
  const answers = currentAnswers;

  const updateAnswers = (newAnswers: Answers) => {
    dispatch({ type: AppActionKind.UPDATE_CURRENT_ANSWERS, data: { currentAnswers: newAnswers } });
  };

  const submitScore = async () => {
    // store locally
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const result = {
      date,
      raw: answers,
      total: currentTotal,
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
    total: currentTotal,
    answers,
    updateAnswers,
    levelOfDepression: currentLevelOfDepression,
  };
}
