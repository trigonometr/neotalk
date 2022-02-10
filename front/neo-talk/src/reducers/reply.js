const initialState = {
  replying: false,
};

export const ON_REPLY = 'REPLY';
export const NO_REPLY = 'NO_REPLY';

export function getReplying(state = initialState, action) {
  switch (action.type) {
    case ON_REPLY:
      return {
        replying: true,
        reply_to_id: action.payload.reply_to_id,
        reply_to_username: action.payload.reply_to_username,
        post_id: action.payload.post_id,
      };
    case NO_REPLY:
      return initialState;
    default: {
      return state;
    }
  }
}
