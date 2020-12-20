import { initialCustomerState, CustomerState, customerAdapter } from '../states/items.state';
import { CustomerAction, CustomerActionType } from '../actions/items.actions';

export function customerReducer(state = initialCustomerState, action: CustomerAction): CustomerState {
  switch (action.type) {
    case CustomerActionType.Loading: {
      return { ...state, loading: true };
    }
    case CustomerActionType.LoadSuccess: {
      return customerAdapter.addAll(action.payload.customers, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.total
      });
    }
    case CustomerActionType.LoadFailure: {
      return customerAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0
      });
    }
    default:
      return state;
  }
}
