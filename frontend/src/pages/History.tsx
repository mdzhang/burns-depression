import { DateTime } from 'luxon';
import { useContext, useEffect, useState } from 'react';
import {
  Alert, Table, Col, Row, Button, Popconfirm,
} from 'antd';

import LoginModal from '../components/LoginModal';
import { ApiQuizResult, QuizResult } from '../lib/types';
import { AppActionKind } from '../lib/reducers';
import { getResults as apiGetResults, deleteAllResults as apiDeleteAllResults } from '../lib/api';
import { AppContext } from '../lib/contexts';
import { getScore, getLevelOfDepression } from '../utils/scoring';
import { isMobileBrowser } from '../utils/device';

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

function History() {
  const [showInfo, setShowInfo] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopconfirmVisible, setShowDeleteConfirm] = useState(false);
  const { data: { user, results }, dispatch } = useContext(AppContext);

  const closeModal = () => setIsModalVisible(false);

  const getResults = async () => {
    if (!user) {
      return;
    }

    const { data, error } = await apiGetResults();
    if (error) {
      // eslint-disable-next-line no-console
      console.warn('Error fetching results', error);
    } else {
      const unsaved = results.filter((r) => !r.id);
      dispatch({
        type: AppActionKind.LOAD_RESULTS,
        data: { results: [...unsaved, ...processResults(data)] },
      });
    }
  };

  const deleteAllResults = async () => {
    if (!user) {
      dispatch({ type: AppActionKind.LOAD_RESULTS, data: { results: [] } });
      return;
    }

    const { error } = await apiDeleteAllResults(user);

    if (error) {
      // eslint-disable-next-line no-console
      console.warn('Error deleting results', error);
    } else {
      dispatch({ type: AppActionKind.LOAD_RESULTS, data: { results: [] } });
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
      dataIndex: 'date',
    },
    {
      title: 'Level of Depression',
      key: 'level',
      dataIndex: 'level',
    },
    {
      title: 'Score',
      key: 'score',
      dataIndex: 'score',
    },
  ];

  const data = results.map((result) => ({
    key: result.id,
    date: result.createdAt.toLocaleString(
      isMobileBrowser() ? DateTime.DATE_SHORT : DateTime.DATETIME_FULL,
    ),
    level: getLevelOfDepression(result.total),
    score: result.total,
  }));

  return (
    <div>
      <div className="overflow-x-auto">
        {showInfo && <Alert message={`Login to ${results.length > 0 ? 'save' : 'see'} your history`} type="info" showIcon onClick={() => setIsModalVisible(true)} />}

        <Table dataSource={data} columns={columns} />

        {results.length > 0 && (
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={10} />
            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
              <Popconfirm
                title="Really?"
                visible={isPopconfirmVisible}
                onConfirm={deleteAllResults}
                onCancel={() => setShowDeleteConfirm(false)}
              >
                <Button
                  type="primary"
                  danger
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete all my data
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
      </div>
      <LoginModal visible={isModalVisible} onClose={closeModal} />
    </div>
  );
}

export default History;