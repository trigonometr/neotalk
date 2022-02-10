import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';

export function initStore() {
  const store = {};

  return createStore(reducers, store, composeWithDevTools());
}
