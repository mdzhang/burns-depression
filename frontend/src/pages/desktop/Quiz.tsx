import { useState } from 'react';
import {
  Alert, Radio, Button, Form,
} from 'antd';

import styles from './Quiz.module.css';
import questions from '../../data/questions.json';

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
  const [form] = Form.useForm();

  const initialValues = questions
    .map((c) => c.questions).flat().reduce((a, v) => ({ ...a, [v]: 0 }), {});

  const getMessage = () => {
    const verb = levelOfDepression === 'Normal but unhappy' ? ' are ' : ' have ';

    return `You scored ${points}. You ${verb} ${levelOfDepression.toLowerCase()}`;
  };

  const updatePoints = async (
    shouldSetShowResults: boolean = false,
  ) => {
    const model = form.getFieldsValue();
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

  const submitScore = async () => {
    const answers = form.getFieldsValue();
    const total = updatePoints(true);

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

      <Form
        layout="horizontal"
        form={form}
        labelCol={{ span: 14 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        onValuesChange={() => updatePoints(false)}
        initialValues={initialValues}
        onFinish={submitScore}
        colon={false}
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

      {showResults && (
        <Alert message={getMessage()} banner type="info" />
      )}
    </main>
  );
}

export default Quiz;
