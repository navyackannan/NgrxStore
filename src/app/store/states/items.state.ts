import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Items } from '../../core/models/items';

export interface CustomerState extends EntityState<Items> {
  error: boolean;
  loading: boolean;
  total: number;
}

export const customerAdapter: EntityAdapter<Items> = createEntityAdapter<Items>({
  selectId: (customer: Items) => customer.id
});

export const initialCustomerState: CustomerState = customerAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});
