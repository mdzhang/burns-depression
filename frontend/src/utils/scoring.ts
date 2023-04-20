import ranges from '../data/ranges.json';

type AnswerValue = 0 | 1 | 2 | 3 | 4 | 5;
export type Answers = { [key: string]: AnswerValue };

/**
 * Score the answers object that has quiz questions as keys
 * and quiz question numbers as string values.
 */
export function getScore(answers: Answers) {
  return Object.values(answers)
    .map((val) => (val === '' ? 0 : parseInt(val, 10)))
    .reduce((a, b) => a + b, 0);
}

export function getLevelOfDepression(score: number) {
  const range = ranges.find((r) => score >= r.min && score <= r.max);
  return range?.result;
}
