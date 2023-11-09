import ranges from '@burns-depression/data/ranges.json';
import { Answers } from '@burns-depression/lib/types';

/**
 * Score the answers object that has quiz questions as keys
 * and quiz question numbers as string values.
 */
export function getScore(answers: Answers) {
  return Object.values(answers)
    .map((val) => Number(val))
    .reduce((a, b) => a + b, 0);
}

export function getLevelOfDepression(score: number) {
  const range = ranges.find((r) => score >= r.min && score <= r.max);
  return range?.result || ranges[0].result;
}
