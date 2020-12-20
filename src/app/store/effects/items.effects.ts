import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CustomerAction, CustomerActionType, CustomerLoadAction, CustomerLoadFailAction ,CustomerLoadSuccessAction} from '../actions/items.actions';
import { ItemsService } from '../../services/items.service';
import { ItemsParams } from '../../core/models/items-params';
import { ItemsResponse } from '../../core/models/items-response';

@Injectable()
export class ItemsEffects {
  constructor(private service: ItemsService, private actions$: Actions) { }

  @Effect()
  public loadItemss$ = this.actions$
    .pipe(ofType<CustomerLoadAction>(CustomerActionType.Loading),
      map(action => action.payload),
      switchMap((params: ItemsParams) =>
        this.service.getCustomers(params).pipe(
          map((response: ItemsResponse) => new CustomerLoadSuccessAction(response)),
          catchError((error) => of(new CustomerLoadFailAction(error)))
        )
      )
    );
}
