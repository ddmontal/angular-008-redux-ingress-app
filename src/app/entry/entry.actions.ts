import { Action } from '@ngrx/store';
import { Entry } from './entry.model';

export const SET_ITEMS = '[ENTRY] Set Items';
export const UNSET_ITEMS = '[ENTRY] Unset Items';

export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;

  constructor(public items: Entry[]) {}
}

export class UnsetItemsAction implements Action {
  readonly type = UNSET_ITEMS;

  constructor() {}
}

export type actions = SetItemsAction | UnsetItemsAction;
