import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";
import {MaterialWindowModel} from "../shared/models/materialWindow.model";
import {OrderService} from "./order.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;

  isRoot: boolean;
  modal: MaterialWindowModel;

  constructor(
      private router: Router,
      private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/site/order';
    // подписываемся на прослушку событий роута (переход на другой адрес)
    this.router.events.subscribe((e: Event) => {
          // является ли событие свойством метода?
          if (e instanceof NavigationEnd) {
            this.isRoot = this.router.url === '/site/order';
          }
        }
    )
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  // метод позволяющий работать с dom после его инициализации
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  submit() {
    this.modal.close();
  }

}
