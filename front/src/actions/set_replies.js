import { SET_REPLY, PUSH_REPLY } from '../reducers/set_replies';

export function changeReplies(payload) {
  return {
    type: SET_REPLY,
    payload,
  };
}

export function pushReply(reply) {
  return {
    type: PUSH_REPLY,
    reply,
  };
}
