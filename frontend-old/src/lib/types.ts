import { DateTime } from 'luxon';

type AnswerValue = '' | 0 | 1 | 2 | 3 | 4 | 5;
export type Answers = { [key: string]: AnswerValue };

export type UserMetadata = {
  full_name?: string;
};

export type User = {
  id: string;
  email?: string;
  user_metadata?: UserMetadata;
};

export type ApiQuizResult = {
  id: number;
  result: string; // JSON
  user_id: string; // UUID
  created_at: string; // datetime
};

export type QuizResult = {
  id: number;
  uid: string; // UUID
  createdAt: DateTime;
  total: number;
  answers: Answers;
};

export type AppContext = {
  user: User | null;
  results: QuizResult[];
  currentAnswers: Answers;
  currentLevelOfDepression: string;
  currentTotal: number;
};
