import { CSSProperties, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Card, Radio, Button, Form, Modal,
} from 'antd';
import styles from './Quiz.module.css';
import useSubmitScore from '../hooks/useSubmitScore';
import questions from '../data/questions.json';

const CardContainerStyle: CSSProperties = {
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  marginTop: '60px',
};

function QuizCongrats() {
  const navigate = useNavigate();
  const { submitScore, levelOfDepression, total } = useSubmitScore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);

  const onClick = () => {
    submitScore();
    setIsModalVisible(true);
  };

  return (
    <div style={CardContainerStyle}>
      <h2>
        Congrats!
      </h2>

      <Button type="primary" htmlType="submit" onClick={onClick}>See my results</Button>

      <Modal
        open={isModalVisible}
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
            { total }
          </b>
          .
          You
          {levelOfDepression === 'Normal but unhappy' ? ' are ' : ' have '}
          <b>
            { levelOfDepression?.toLowerCase() }
            .
          </b>
        </div>
      </Modal>
    </div>
  );
}

function QuizLanding() {
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

      <Link
        to="/take-quiz?page=1"
      >
        <Button type="primary" htmlType="submit">Take Quiz</Button>
      </Link>
    </main>
  );
}

function Quiz() {
  const [form] = Form.useForm();
  const { search } = useLocation();
  const page = new URLSearchParams(search).get('page');
  const { answers, updateAnswers } = useSubmitScore();
  const navigate = useNavigate();

  const quizPage = Number(page);
  const isFirstPage = quizPage === 1;
  const isResultPage = quizPage === questions.length + 1;

  useEffect(() => {
    if (quizPage && quizPage > questions.length + 1) {
      navigate('/take-quiz');
    }
  }, [quizPage]);

  if (!quizPage) {
    return <QuizLanding />;
  }

  if (isResultPage) {
    return <QuizCongrats />;
  }

  const section = questions[quizPage - 1];
  const goToPage = (p: number) => {
    navigate(`/take-quiz?page=${p}`);
  };
  const title = `${section.category} (${quizPage}/${questions.length})`;

  // eslint-disable-next-line no-nested-ternary
  const header = quizPage > questions.length / 2
    ? 'You’re almost there! just a few more questions and you’re done!'
    : quizPage === 1
      ? 'Answer the following questions according to ongoing feelings.'
      : 'You’re doing great! Keep it up!';

  return (
    <div style={CardContainerStyle}>
      <h2>
        {header}
      </h2>

      <Card title={title} style={{ width: 600 }}>
        <Form
          layout="horizontal"
          form={form}
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 24 }}
          labelAlign="left"
          onValuesChange={updateAnswers}
          initialValues={answers}
          colon={false}
          labelWrap
        >
          {section.questions.map((question) => (
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

          <Form.Item label=" ">
            {!isFirstPage && (<Button type="default" onClick={() => goToPage(quizPage - 1)}>Back</Button>)}
            <Button type="primary" onClick={() => goToPage(quizPage + 1)}>Next</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Quiz;
