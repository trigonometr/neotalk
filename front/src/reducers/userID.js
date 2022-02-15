const initialState = {
  userID: null,
};

export const LOGIN_ACTION = 'LOGIN';
export const LOGOUT_ACTION = 'LOGOUT';

export function getUserID(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return { userID: action.userID };
    case LOGOUT_ACTION:
      return initialState;
    default: {
      return state;
    }
  }
}
