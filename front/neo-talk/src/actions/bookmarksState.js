import { ON_BOOKMARKS, OFF_BOOKMARKS } from '../reducers/bookmarksState';

export function setBookmarksActive() {
  return {
    type: ON_BOOKMARKS,
  };
}

export function setBookmarksInactive() {
  return {
    type: OFF_BOOKMARKS,
  };
}
