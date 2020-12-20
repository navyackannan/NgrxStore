import { Action } from '@ngrx/store';
import { ItemsParams } from '../../core/models/items-params';
import { ItemsResponse } from '../../core/models/items-response';

export enum CustomerActionType {
  Loading = '[Customer] Loading',
  LoadSuccess = '[Customer] LoadSuccess',
  LoadFailure = '[Customer] LoadFailure'
}

export class CustomerLoadAction implements Action {
  public readonly type = CustomerActionType.Loading;
  constructor(public payload: ItemsParams) {}
}

export class CustomerLoadSuccessAction implements Action {
  public readonly type = CustomerActionType.LoadSuccess;
  constructor(public payload: ItemsResponse) {}
}

export class CustomerLoadFailAction implements Action {
  public readonly type = CustomerActionType.LoadFailure;
  constructor(public error: any) {}
}

export type CustomerAction = CustomerLoadAction | CustomerLoadSuccessAction | CustomerLoadFailAction;