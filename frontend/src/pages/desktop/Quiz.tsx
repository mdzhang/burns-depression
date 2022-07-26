import { useState } from 'react';
import Formsy from 'formsy-react';

import ButtonRange from '../../components/desktop/forms/ButtonRange';
import data from '../../data/questions.json';
import ranges from '../../data/ranges.json';

import styles from './Quiz.module.css';

function Quiz() {
  const [levelOfDepression, setLevelOfDepression] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [points, setPoints] = useState(0);

  const updatePoints = (model: { [key: string]: string; }) => {
    const total = Object.values(model)
      .map((val) => (val === '' ? 0 : parseInt(val, 10)))
      .reduce((a, b) => a + b, 0);

    setShowResults(true);
    setPoints(total);

    const range = ranges.find((r) => total >= r.min && total <= r.max);
    if (range) {
      setLevelOfDepression(range.result);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Could not find matching range for total: ${total}`);
    }

    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const result = {
      date,
      raw: model,
      total,
    };

    window.localStorage.setItem(`result_${date}`, JSON.stringify(result));
  };

  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold">
        Take The Burns Depression Checklist
      </h1>

      <p>
        From
        {' '}
        <a href="https://www.amazon.com/Feeling-Good-New-Mood-Therapy-ebook/dp/B009UW5X4C">
          Feeling Good: The New Mood Therapy, by
          David D. Burns
        </a>
      </p>

      <Formsy onValidSubmit={updatePoints} onChange={updatePoints}>
        <table className="table-auto rounded-lg">
          <tbody>
            {data.map((entry) => (
              <>
                <tr>
                  <td className="px-4 py-2 pt-8">
                    <b>
                      {entry.category}
                    </b>
                  </td>
                  <td />
                </tr>
                {entry.questions.map((question) => (
                  <tr key={question}>
                    <td
                      className="border px-4 py-2"
                      key={question}
                    >
                      {question}
                    </td>
                    <td
                      className="border px-4 py-2"
                    >
                      <ButtonRange name={question} value="0" />
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>

        <div className="my-4 grid place-items-center pt-4">
          <button
            type="submit"
            className="flex-shrink-0  text-sm border-4 text-white py-1 px-2 rounded bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700"
          >
            See my results
          </button>
        </div>

      </Formsy>

      {showResults && (
        <div className="text-xl">
          You scored
          {' '}
          <span className="font-bold">
            { points }
          </span>
          .
          You
          {levelOfDepression === 'Normal but unhappy' ? ' are ' : ' have '}
          <span className="font-bold">
            { levelOfDepression.toLowerCase() }
            .
          </span>
        </div>
      )}
    </main>
  );
}

export default Quiz;
