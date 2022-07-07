import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// TODO: move to frontend
import * as data from '../../data/questions.json';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Burns Depression Checklist</title>
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">
          Take The Burns Depression Checklist
        </h1>

        <p className={styles.description}>
          From{' '}
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
              .map((question, index) => (
                <tr key={index}>
                  <td
                    className="border px-4 py-2"
                    key={index}
                  >
                    {question}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;
