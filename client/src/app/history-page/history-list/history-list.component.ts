import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "../../shared/models/order.model";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  @Input('ordersIn') orders: OrderModel[];

  constructor() {
  }

  ngOnInit() {
  }

}
