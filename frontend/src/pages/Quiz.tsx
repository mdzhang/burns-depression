import { DateTime } from 'luxon';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio, Button, Form, Modal,
} from 'antd';

import styles from './Quiz.module.css';
import questions from '../data/questions.json';

import { saveResults } from '../lib/api';
import { AppActionKind } from '../lib/reducers';
import { AppContext } from '../lib/contexts';
import { QuizResult } from '../lib/types';
import { getScore, getLevelOfDepression } from '../utils/scoring';

function Quiz() {
  const [levelOfDepression, setLevelOfDepression] = useState('');
  const [points, setPoints] = useState(0);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const navigate = useNavigate();
  const { data: { user, results }, dispatch } = useContext(AppContext);

  const initialValues = questions
    .map((c) => c.questions).flat().reduce((a, v) => ({ ...a, [v]: 0 }), {});

  const updatePoints = async () => {
    const model = form.getFieldsValue();
    const total = getScore(model);

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

  const submitScore = async () => {
    const answers = form.getFieldsValue();
    const total = getScore(answers);

    // store remotely if logged in
    if (user) {
      const result: QuizResult = {
        createdAt: DateTime.now(),
        total,
        answers,
      };
      await saveResults(user, [result]);
    } else {
      // add to reducer state which is cacahed in browser
      const result = {
        createdAt: DateTime.now(),
        total: getScore(answers),
        answers,
      };
      dispatch({ type: AppActionKind.LOAD_RESULTS, data: { results: [result, ...results] } });
    }

    setIsModalVisible(true);
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

      <Form
        layout="horizontal"
        form={form}
        labelCol={{ span: 14 }}
        wrapperCol={{ span: 24 }}
        labelAlign="left"
        onValuesChange={updatePoints}
        initialValues={initialValues}
        onFinish={submitScore}
        colon={false}
        labelWrap
      >
        {questions.map((entry) => (
          <div key={entry.category}>
            <h2>
              {entry.category}
            </h2>

            {entry.questions.map((question) => (
              <Form.Item label={question} name={question} key={question}>
                <Radio.Group>
                  {
                    [0, 1, 2, 3, 4]
                      .map((num) => (
                        <Radio.Button value={num} key={num}>
                          {num}
                        </Radio.Button>
                      ))
                  }
                </Radio.Group>
              </Form.Item>
            ))}
          </div>
        ))}

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">See my results</Button>
        </Form.Item>
      </Form>

      <Modal
        visible={isModalVisible}
        title="Results"
        onOk={closeModal}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={() => navigate('/history')}>
            See history
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'center' }}>
          You scored
          {' '}
          <b>
            { points }
          </b>
          .
          You
          {levelOfDepression === 'Normal but unhappy' ? ' are ' : ' have '}
          <b>
            { levelOfDepression.toLowerCase() }
            .
          </b>
        </div>
      </Modal>
    </main>
  );
}

export default Quiz;
