import styles from './App.module.css';
import data from './data/questions.json';

function App() {
  return (
    <div className={styles.container}>
      <header>
        <title>Burns Depression Checklist</title>
      </header>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">
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
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
