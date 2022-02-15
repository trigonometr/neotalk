import { combineReducers } from 'redux';
import { getUserID } from './userID';
import { bookmarksState } from './bookmarksState';
import { getReplying } from './reply';
import { setReplies } from './set_replies';
import { getAuth } from './auth';
import { getSearchResults } from './search';

export const reducers = combineReducers({
  getAuth,
  getUserID,
  getReplying,
  getSearchResults,
  bookmarksState,
  setReplies,
});
