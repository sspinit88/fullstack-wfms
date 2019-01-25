import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Router, NavigationEnd} from '@angular/router'
import {MaterialService} from '../shared/classes/material.service'
import {OrderService} from './order.service'
import {OrderPositionModel} from "../shared/models/order-position.model";
import {MaterialWindowModel} from "../shared/models/materialWindow.model";


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialWindowModel;
  isRoot: boolean;

  constructor(private router: Router,
              private order: OrderService) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/site/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/site/order';
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPositionModel) {
    // this.order.remove(orderPosition)
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.modal.close()
  }

}
