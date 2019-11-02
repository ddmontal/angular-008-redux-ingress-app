import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[AUTH] SET_USER';
export const UNSET_USER = '[AUTH] UNSET_USER';

export class SetUSerAction implements Action {
  readonly type = SET_USER;

  constructor(public user: User) {}
}

export class UnsetUserAction implements Action {
  readonly type = UNSET_USER;

  constructor() {}
}

export type actions = SetUSerAction | UnsetUserAction;
