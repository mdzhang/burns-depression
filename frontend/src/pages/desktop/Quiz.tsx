import Formsy from 'formsy-react';
import ButtonRange from '../../components/desktop/forms/ButtonRange';
import data from '../../data/questions.json';

import styles from './Quiz.module.css';

function Quiz() {
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
                  <Formsy>
                    <ButtonRange name={question} value="" />
                  </Formsy>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default Quiz;
