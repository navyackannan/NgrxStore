import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Items } from '../core/models/items';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalState } from '../store/states/global.state';
import { Store, select } from '@ngrx/store';
import { selectAllCustomer, selectCustomerTotal, selectCustomerError, selectCustomerLoading } from '../store/selectors/items.selectors';
import { CustomerLoadAction } from '../store/actions/items.actions';
import { ItemsParams } from '../core/models/items-params';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, merge, Subject, Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public displayedColumns: string[] = ['id', 'type', 'name', 'rate'];
  public dataSource: MatTableDataSource<Items>;
  public customerTotal: number;
  public noData: Items[] = [<Items>{}];
  public loading: boolean;
  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();
  public defaultSort: Sort = { active: 'type', direction: 'asc' };

  private filter: string = "";
  private subscription: Subscription = new Subscription();

  constructor(public store: Store<GlobalState>) { }

  public ngOnInit(): void {
    this.store.pipe(select(selectAllCustomer)).subscribe(items => this.initializeData(items));
    this.store.pipe(select(selectCustomerTotal)).subscribe(total => this.customerTotal = total);
    this.subscription.add(this.store.pipe(select(selectCustomerLoading)).subscribe(loading => {
      if (loading) {
        this.dataSource = new MatTableDataSource(this.noData);
      }
      this.loading = loading;
    }));
    this.error$ = this.store.pipe(select(selectCustomerError));
  }

  public ngAfterViewInit(): void {
    this.loadCustomers();
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));

    this.subscription.add(merge(filter$, sort$, this.paginator.page).pipe(
      tap(() => this.loadCustomers())
    ).subscribe());
  }

  private loadCustomers(): void {
    this.store.dispatch(new CustomerLoadAction(
      <ItemsParams>{
        filter: this.filter.toLocaleLowerCase(),
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        sortDirection: this.sort.direction,
        sortField: this.sort.active
      }
    ));
  }

  private initializeData(customers: Items[]): void {
    this.dataSource = new MatTableDataSource(customers.length ? customers : this.noData);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void { 
    this.loadCustomers();
  }
}
