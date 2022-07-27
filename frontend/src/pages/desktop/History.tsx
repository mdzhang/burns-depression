import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { ApiQuizResult, QuizResult, User } from '../../lib/types';
import { supabase } from '../../lib/api';
import { getScore, getLevelOfDepression } from '../../utils/scoring';

interface Props {
  user: User | null;
}

const processResults = (results: ApiQuizResult[]): QuizResult[] => results.map((r) => {
  const parsed = JSON.parse(r.result);
  return {
    id: r.id,
    uid: r.user_id,
    createdAt: DateTime.fromISO(r.created_at),
    total: getScore(parsed),
    answers: parsed,
  } as QuizResult;
});

function History({ user }: Props) {
  const [results, setResults] = useState<QuizResult[]>([]);

  const getResults = async () => {
    const { data, error } = await supabase
      .from('quiz_results');

    if (error) {
      // eslint-disable-next-line no-console
      console.warn('Error fetching results', error);
    } else {
      setResults(processResults(data));
    }
  };

  useEffect(() => {
    getResults();
  }, [user]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">
                Date
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-1.5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">
                Level of Depression
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-1.5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">
                Score
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-1.5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {results.map((result) => (
            <tr key={result.id}>
              <td className="p-4 text-gray-700 whitespace-nowrap">{result.createdAt.toLocaleString(DateTime.DATETIME_FULL)}</td>
              <td className="p-4 text-gray-700 whitespace-nowrap">
                <strong
                  className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-medium"
                >
                  {getLevelOfDepression(result.total)}
                </strong>
              </td>
              <td className="p-4 text-gray-700 whitespace-nowrap">{result.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;