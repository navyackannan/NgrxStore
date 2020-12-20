import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Items } from '../core/models/items';
import { ItemsParams } from '../core/models/items-params';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemsResponse } from '../core/models/items-response';

@Injectable()
export class ItemsService {

  constructor(private httpClient: HttpClient) { }

  public getCustomers(params: ItemsParams): Observable<ItemsResponse> {
    // return this.httpClient.post<Customer[]>("localhost:4200/customers", params);
    return of(this.getFakeCustomers(params)).pipe(delay(3000));
  }

  private getFakeCustomers(params: ItemsParams): ItemsResponse {
    let data = <Items[]>[];

    data = customers.filter(c => ~(c.type.toLocaleLowerCase()).indexOf(params.filter)
    || ~(c.name.toLocaleLowerCase()).indexOf(params.filter));  


    data.sort((a, b) => (a[params.sortField] > b[params.sortField] ? 1 : -1) * (params.sortDirection === "asc" ? 1 : -1));    
    
    return {
      total: data.length,
      customers: data.slice((params.pageIndex) * params.pageSize, (params.pageIndex + 1) * params.pageSize)
    };
  }
}

const customers = <Items[]>[
  <Items>{
    id: "1",
    rate: 5,
   name: "A Fine Balance",
    type: "Book"
  },
  <Items>{
    id: "2",
   rate: 0,
   name: "The Glass Palace",
    type: "Book"
  },
  <Items>{
    id: "3",
   rate: 5,
   name: "Neelambari",
    type: "Book"
  },
  <Items>{
    id: "4",
   rate: 2,
   name: "The God of small things",
    type: "Book"
  },
  <Items>{
    id: "5",
   rate: 4,
   name: "Sweets",
    type: "Food"
  },
  <Items>{
    id: "6",
   rate: 5,
   name: "Gulab jamun",
    type: "food"
  },
  <Items>{
    id: "7",
   rate: 0,
   name: "Biriyani",
    type: "Food"
  },
  <Items>{
    id: "8",
   rate: 0,
   name: "Fruits juice",
    type: "Food"
  },
  <Items>{
    id: "9",
   rate: 0,
   name: "My life",
    type: "Book"
  },
  <Items>{
    id: "10",
   rate: 0,
   name: "Rotti",
    type: "Food"
  },

];