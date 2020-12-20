import { CustomerState, initialCustomerState } from './items.state';

export interface GlobalState {
  customer: CustomerState;
}

export const initialGlobalState: GlobalState = {
  customer: initialCustomerState
};
