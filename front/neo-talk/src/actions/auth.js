import { SET_AUTH } from '../reducers/auth';

export function setAuth(value) {
  return {
    type: SET_AUTH,
    auth: value,
  };
}
