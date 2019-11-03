import * as fromEntry from './entry.actions';
import { Entry } from './entry.model';
import { State } from '../shared/ui.reducer';
import { AppState } from '../app.reducer';

export interface EntryState {
  items: Entry[];
}

export interface AppState extends AppState {
  entry: EntryState;
}

const initState: EntryState = {
  items: []
};

export function entryReducer(state = initState, action: fromEntry.actions): EntryState {
  switch (action.type) {
    case fromEntry.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => {
            return { ...item };
          })
        ]
      };

    case fromEntry.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }
}
