import { ActionReducerMap } from '@ngrx/store';
import * as fromUIReducer from './shared/ui.reducer';
import * as fromAuthReducer from './auth/auth.reducer';

export interface AppState {
  ui: fromUIReducer.State;
  auth: fromAuthReducer.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.uiReducer,
  auth: fromAuthReducer.authReducer
};
