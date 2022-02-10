import { LOGIN_ACTION } from '../reducers/userID';

export function setUserID(userID) {
  return {
    type: LOGIN_ACTION,
    userID,
  };
}
