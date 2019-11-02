import * as fromAuthActions from './auth.actions';
import { User } from './user.model';
import { actions } from './auth.actions';
import { fromEventPattern } from 'rxjs';

export interface AuthState {
  user: User;
}

const initState: AuthState = {
  user: null
};

export function authReducer(state: AuthState = initState, action: fromAuthActions.actions): AuthState {
  switch (action.type) {
    case fromAuthActions.SET_USER:
      return {
        user: {
          ...action.user
        }
      };
    case fromAuthActions.UNSET_USER:
      return {
        user: null
      };
    default:
      return state;
  }
}
