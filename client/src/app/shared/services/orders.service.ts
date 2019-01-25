import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {OrderModel} from "../models/order.model";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class OrdersService {

  constructor(
      private http: HttpClient,
  ) {
  }

  create(order: OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(`/api/order`, order);
  }

}
