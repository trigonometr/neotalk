const initialState = {
  bookmarks_state: false,
};

export const ON_BOOKMARKS = 'BOOKMARKS';
export const OFF_BOOKMARKS = 'ANOTHER';

export function bookmarksState(state = initialState, action) {
  switch (action.type) {
    case ON_BOOKMARKS:
      return { bookmarks_state: true };
    case OFF_BOOKMARKS:
      return initialState;
    default: {
      return state;
    }
  }
}
