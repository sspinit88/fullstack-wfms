import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialWindowModel} from "../shared/models/materialWindow.model";
import {MaterialService} from "../shared/classes/material.service";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs/internal/Subscription";
import {OrderModel} from "../shared/models/order.model";
import {FilterModel} from "../shared/models/filter.model";

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialWindowModel;
  isFilterVisible = false;

  aSub: Subscription;

  loading = false;
  reloading = false;

  noMoreOrders = false;

  offset: number = 0;
  limit: number = STEP;

  orders: OrderModel[] = [];
  filter: FilterModel = {};

  constructor(
      private ordersService: OrdersService,
  ) {
  }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  private fetch() {
    // const params = {
    //   offset: this.offset,
    //   limit: this.limit,
    // };

    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit,
    });

    this.aSub = this.ordersService.fetch(params)
        .subscribe(
            orders => {
              // передавая в метод конкат будем добавлять новые позиции заказов не удаляя старые
              this.orders = this.orders.concat(orders);

              // если длина полученных заказов меньше шага, то заказов больше нет
              this.noMoreOrders = orders.length < STEP;

              // после преобразования orders убираем загрузку
              this.loading = false;
              this.reloading = false;
            }
        );
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.aSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  loadMore() {
    // увеличиваем оффсет на шаг
    this.offset += STEP;
    // и подгружаем новые данные
    this.fetch();
    this.loading = true;
  }

  applyFilter(filter: FilterModel) {
    this.orders = []; // обнуляем все данные, которые получили ранее
    this.offset = 0; //
    this.reloading = true;
    this.filter = filter;
    this.fetch();
  }

  // осуществляем проверку на заполненность хотя бы одного поля фильтра
  isFilttred(): boolean {
    return Object.keys(this.filter).length;
  }
}
