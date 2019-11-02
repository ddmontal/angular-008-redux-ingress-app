import { ActionReducerMap } from '@ngrx/store';
import * as fromUIReducer from './shared/ui.reducer';
import * as fromAuthReducer from './auth/auth.reducer';
import * as fromEntryReducer from './entry/entry.reducer';

export interface AppState {
  ui: fromUIReducer.State;
  auth: fromAuthReducer.AuthState;
  entry: fromEntryReducer.EntryState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.uiReducer,
  auth: fromAuthReducer.authReducer,
  entry: fromEntryReducer.entryReducer
};
