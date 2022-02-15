import { ON_REPLY, NO_REPLY } from '../reducers/reply';

export function setOnReply(payload) {
  return {
    type: ON_REPLY,
    payload,
  };
}

export function setNoReply() {
  return {
    type: NO_REPLY,
  };
}
