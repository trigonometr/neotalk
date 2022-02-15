const initialState = {
  auth: false,
};

export const SET_AUTH = 'SET_AUTH';

export function getAuth(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return { auth: action.auth };
    default: {
      return state;
    }
  }
}
