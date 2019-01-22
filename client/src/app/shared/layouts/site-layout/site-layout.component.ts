import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MaterialService} from "../../classes/material.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit  {

  // ставим на прослушку #floatingBtn и помещаем в floatingBtnRef
  @ViewChild('floatingBtn') floatingBtnRef: ElementRef;

  links = [
    {url: '/site/overview', name: 'Обзор'},
    {url: '/site/analytics', name: 'Аналитика'},
    {url: '/site/history', name: 'История'},
    {url: '/site/order', name: 'Добавить заказ'},
    {url: '/site/categories', name: 'Ассортимент'}
  ];

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
      private authServices: AuthService,
      private router: Router,
  ) {
  }

  // запускается, когда уже есть dom-дерево в dom
  ngAfterViewInit() {
    // когда dom будет готов, передаем floatingBtnRef
    MaterialService.initializeFloatingButton(this.floatingBtnRef);
  }

  logout(event: Event) {
    event.preventDefault();
    this.authServices.logout();
    this.router.navigate(['/login']);
  }

}
