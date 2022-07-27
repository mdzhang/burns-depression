import ranges from '../data/ranges.json';

/**
 * Score the Formsy form model that has quiz questions as keys
 * and quiz question numbers as string values.
 */
export function getScore(model: { [key: string]: string }) {
  return Object.values(model)
    .map((val) => (val === '' ? 0 : parseInt(val, 10)))
    .reduce((a, b) => a + b, 0);
}

export function getLevelOfDepression(score: number) {
  const range = ranges.find((r) => score >= r.min && score <= r.max);
  return range?.result;
}
