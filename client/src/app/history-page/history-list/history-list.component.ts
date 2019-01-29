import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {OrderModel} from "../../shared/models/order.model";
import {MaterialWindowModel} from "../../shared/models/materialWindow.model";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {

  @Input('ordersIn') orders: OrderModel[];
  @ViewChild('modal') modalRef: ElementRef;

  modal: MaterialWindowModel;
  selectedOrder: OrderModel;

  constructor() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  // вычисляем общую сумму заказа
  computePrice(order: OrderModel): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0)
  }

  selectOrder(order: OrderModel) {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeModal(){
    this.modal.close();
  }

}
