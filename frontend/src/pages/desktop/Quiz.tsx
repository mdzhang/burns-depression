import { useState } from 'react';
import Formsy from 'formsy-react';

import styles from './Quiz.module.css';
import ButtonRange from '../../components/ButtonRange';
import questions from '../../data/questions.json';

import { isMobileBrowser } from '../../utils/device';
import { supabase } from '../../lib/api';
import { User } from '../../lib/types';
import { getScore, getLevelOfDepression } from '../../utils/scoring';

interface Props {
  user: User | null;
}

function Quiz({ user }: Props) {
  const [levelOfDepression, setLevelOfDepression] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [points, setPoints] = useState(0);

  const updatePoints = async (
    model: { [key: string]: string; },
    shouldSetShowResults: boolean = false,
  ) => {
    const total = getScore(model);

    setShowResults(shouldSetShowResults);
    setPoints(total);

    const level = getLevelOfDepression(total);
    if (level) {
      setLevelOfDepression(level);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Could not find matching range for total: ${total}`);
    }

    return total;
  };

  const submitScore = async (answers: { [key: string]: string; }) => {
    const total = updatePoints(answers, true);

    // store locally
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const result = {
      date,
      raw: answers,
      total,
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

  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold">
        Take The Burns Depression Quiz
      </h1>

      <p>
        From
        {' '}
        <a href="https://feelinggood.com/">
          Feeling Good: The New Mood Therapy, by
          David D. Burns
        </a>
      </p>

      <Formsy
        onValidSubmit={(model) => submitScore(model)}
        onChange={(model) => updatePoints(model, false)}
      >
        <table>
          <tbody>
            {questions.map((entry) => (
              <>
                <tr>
                  <td>
                    <b>
                      {entry.category}
                    </b>
                  </td>
                  <td />
                </tr>
                {entry.questions.map((question) => (
                  <tr key={question}>
                    <td>
                      {question}

                      {isMobileBrowser() && (
                        <div>
                          <ButtonRange name={question} value="0" />
                        </div>
                      )}
                    </td>
                    {!isMobileBrowser() && (
                      <td>
                        <ButtonRange name={question} value="0" />
                      </td>
                    )}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>

        <div>
          <button
            type="submit"
          >
            See my results
          </button>
        </div>

      </Formsy>

      {showResults && (
        <div style={{ textAlign: 'center' }}>
          You scored
          {' '}
          <span>
            { points }
          </span>
          .
          You
          {levelOfDepression === 'Normal but unhappy' ? ' are ' : ' have '}
          <span>
            { levelOfDepression.toLowerCase() }
            .
          </span>
        </div>
      )}
    </main>
  );
}

export default Quiz;
