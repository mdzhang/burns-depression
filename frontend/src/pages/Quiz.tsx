import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Radio, Button, Form, Modal,
} from 'antd';
import styles from './Quiz.module.css';
import useSubmitScore from '../hooks/useSubmitScore';
import questions from '../data/questions.json';

function QuizCongrats() {
  const form = Form.useFormInstance();
  const { levelOfDepression, total } = useSubmitScore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const navigate = useNavigate();

  const onClick = () => {
    form.submit();

    setIsModalVisible(true);
  };

  return (
    <>
      Congrats!

      <Button type="primary" htmlType="submit" onClick={onClick}>See my results</Button>

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
    </>
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
  const { page } = useParams();
  const { answers, setAnswers, submitScore } = useSubmitScore();
  const navigate = useNavigate();

  const quizPage = Number(page);
  const isFirstPage = quizPage === 1;
  const isLastPage = quizPage === questions.length - 1;
  const isResultPage = quizPage === questions.length;

  useEffect(() => {
    if (quizPage && quizPage > questions.length - 1) {
      navigate('/take-quiz');
    }
  }, [quizPage]);

  if (!quizPage) {
    return <QuizLanding />;
  }

  if (isResultPage) {
    return <QuizCongrats />;
  }

  const section = questions[quizPage];
  const goToPage = (p: number) => {
    navigate(`/take-quiz?page=${p}`);
  };

  return (
    <>
      <h2>
        Answer the following questions according to ongoing feelings.
      </h2>

      <h3>
        {section.category}
      </h3>

      <Form
        layout="horizontal"
        form={form}
        labelCol={{ span: 14 }}
        wrapperCol={{ span: 24 }}
        labelAlign="left"
        onValuesChange={setAnswers}
        initialValues={answers}
        onFinish={submitScore}
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
          {!isFirstPage && <Button type="default" htmlType="submit" onClick={() => goToPage(quizPage - 1)}>Back</Button>}
          {!isLastPage && <Button type="primary" htmlType="submit" onClick={() => goToPage(quizPage + 1)}>Next</Button>}
        </Form.Item>
      </Form>
    </>
  );
}

export default Quiz;
