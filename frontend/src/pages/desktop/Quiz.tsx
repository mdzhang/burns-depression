import { useState } from 'react';
import Formsy from 'formsy-react';

import ButtonRange from '../../components/desktop/forms/ButtonRange';
import data from '../../data/questions.json';

import styles from './Quiz.module.css';

function Quiz() {
  const [points, setPoints] = useState(0);

  const updatePoints = (model: { [key: string]: string; }) => {
    const total = Object.values(model)
      .map((val) => (val === '' ? 0 : parseInt(val, 10)))
      .reduce((a, b) => a + b, 0);

    setPoints(total);
  };

  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold">
        Take The Burns Depression Checklist
      </h1>

      <p className={styles.description}>
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
            {data
              .map((c) => c.questions)
              .flat()
              .map((question) => (
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
                    <ButtonRange name={question} value="" />
                  </td>
                </tr>
              ))}

            <tr>
              <td
                className="border px-4 py-2"
                key="submit"
              >
                <button
                  type="submit"
                  className="flex-shrink-0  text-sm border-4 text-white py-1 px-2 rounded bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700"
                >
                  Submit
                </button>
              </td>
              <td
                className="border px-4 py-2"
                key="total"
              >
                Total:
                {' '}
                <b>{points}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </Formsy>
    </main>
  );
}

export default Quiz;
