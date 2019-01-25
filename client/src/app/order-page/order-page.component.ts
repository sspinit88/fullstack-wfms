import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Router, NavigationEnd} from '@angular/router'
import {MaterialService} from '../shared/classes/material.service'
import {OrderService} from './order.service'
import {OrderPositionModel} from "../shared/models/order-position.model";
import {MaterialWindowModel} from "../shared/models/materialWindow.model";
import {OrdersService} from "../shared/services/orders.service";
import {OrderModel} from "../shared/models/order.model";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  providers: [OrderService]
})

export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialWindowModel;
  isRoot: boolean;
  pending: boolean = false;
  aSub: Subscription;

  constructor(
      private router: Router,
      private order: OrderService,
      private ordersServise: OrdersService, // этот сервис служит для работы с backend
  ) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/site/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/site/order';
      }
    });

  }

  ngOnDestroy() {
    this.modal.destroy()

    if(this.aSub){
      this.aSub.unsubscribe();
    }

  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPositionModel) {
    this.order.remove(orderPosition)
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.pending = true;
    // this.modal.close();

    const newOrder: OrderModel = {
      // нам не нужно отправляь данные, что бы в них присутствовал iв, удаляем его.
      list: this.order.list.map(
          item => {
            delete item._id;
            return item;
          }
      ),
    }

    this.aSub = this.ordersServise.create(newOrder)
        .subscribe(
            order => {
              MaterialService.toast(`Заказ № ${order.order} был добавлен.`);
              this.order.clear();
            },
            error => {
              MaterialService.toast(error.error.message);
            },
            () => {
              this.modal.close();
              this.pending = false;
            }
        );
  }

}
