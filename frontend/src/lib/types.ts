import { DateTime } from 'luxon';

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
  // results tracked before user logged in missing these fields
  id?: number;
  uid?: string; // UUID
  createdAt: DateTime;
  total: number;
  answers: { [key: string]: string };
};

export type AppContext = {
  user: User | null;
  results: QuizResult[];
};
