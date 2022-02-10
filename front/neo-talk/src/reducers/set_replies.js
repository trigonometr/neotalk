const initialState = {
  payload: [],
};

export const SET_REPLY = 'SET_REPLY';
export const PUSH_REPLY = 'PUSH_REPLY';

export function setReplies(state = initialState, action) {
  switch (action.type) {
    case SET_REPLY:
      return {
        payload: action.payload,
      };
    case PUSH_REPLY:
      return {
        payload: [...state.payload, action.reply],
      };
    default: {
      return state;
    }
  }
}
