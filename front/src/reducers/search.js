const initialState = {
  results: [],
};

export const FOUND = 'FOUND';
export const CLEAR = 'CLEAR';

export function getSearchResults(state = initialState, action) {
  switch (action.type) {
    case FOUND:
      return {
        results: action.results,
      };
    case CLEAR:
      return initialState;
    default: {
      return state;
    }
  }
}
