import { FOUND, CLEAR } from '../reducers/search';

export function setResults(results) {
  return {
    type: FOUND,
    results,
  };
}

export function clearResults() {
  return {
    type: CLEAR,
  };
}
