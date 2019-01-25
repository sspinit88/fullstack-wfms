import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

import {OrderModel} from "../models/order.model";


@Injectable()
export class OrdersService {

  constructor(
      private http: HttpClient,
  ) {
  }

  create(order: OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(`/api/order`, order);
  }

  // получает все заказы
  fetch(params: any = {}): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`/api/order`, {
      params: new HttpParams({
        fromObject: params,
      })
    });
  }

}
