import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI] ACTIVATE_LOGIN';
export const DEACTIVATE_LOADING = '[UI] DEACTIVATE_LOGIN';

export class ActivateLoadingAction implements Action {
  readonly type = ACTIVATE_LOADING;
}

export class DeactivateLoadingAction implements Action {
  readonly type = DEACTIVATE_LOADING;
}

export type actions = ActivateLoadingAction | DeactivateLoadingAction;
