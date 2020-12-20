import { Items } from './items';

export interface ItemsResponse {
  total: number,
  customers: Items[]
}