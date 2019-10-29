import { ActionReducerMap } from '@ngrx/store';
import * as fromUIReducer from './shared/ui.reducer';

export interface AppState {
  ui: fromUIReducer.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.uiReducer
};
