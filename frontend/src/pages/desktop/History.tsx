import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Table } from 'antd';

import { ApiQuizResult, QuizResult, User } from '../../lib/types';
import { supabase } from '../../lib/api';
import { getScore, getLevelOfDepression } from '../../utils/scoring';
import { isMobileBrowser } from '../../utils/device';

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
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const getResults = async () => {
    if (!user) { return; }

    const { data, error } = await supabase
      .from('quiz_results');

    if (error) {
      // eslint-disable-next-line no-console
      console.warn('Error fetching results', error);
    } else {
      setResults(processResults(data));
    }
  };

  const deleteAllResults = async () => {
    if (!user) { return; }

    const { error } = await supabase
      .from('quiz_results')
      .delete()
      .match({ user_id: user.id });

    if (error) {
      // eslint-disable-next-line no-console
      console.warn('Error deleting results', error);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    if (user === null) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
      getResults();
    }
  }, [user]);

  const columns = [
    {
      title: 'Date',
      key: 'date',
    },
    {
      title: 'Level of Depression',
      key: 'level',
    },
    {
      title: 'Score',
      key: 'score',
    },
  ];

  const data = results.map((result) => ({
    date: result.createdAt.toLocaleString(
      isMobileBrowser() ? DateTime.DATE_SHORT : DateTime.DATETIME_FULL,
    ),
    level: getLevelOfDepression(result.total),
    score: result.total,
  }));

  return (
    <div>
      <div className="overflow-x-auto">
        {showInfo && <Alert message="Login to see your history" type="info" showIcon onClick={() => navigate('/login')} />}

        <Table dataSource={data} columns={columns} />
        ;

        {user && results.length > 0 && (
        <div className="my-4 grid place-items-center pt-4">
          <button
            type="submit"
            className="flex-shrink-0  text-sm border-4 text-white py-1 px-2 rounded bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700"
            onClick={deleteAllResults}
          >
            Delete all my data
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default History;
