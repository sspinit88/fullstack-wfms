import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {FilterModel} from "../../shared/models/filter.model";
import {MaterialService} from "../../shared/classes/material.service";
import {MaterialDatepickerModel} from "../../shared/models/MaterialDatepicker.model";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<FilterModel>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  order: number;
  start: MaterialDatepickerModel;
  end: MaterialDatepickerModel;
  isValid: boolean = true;

  constructor() {
  }

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();
  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this));
  }

  // проверяем временной интервал на валидность
  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    // console.log(this.start.date < this.end.date);
    this.isValid = this.start.date < this.end.date;
  }

  submitFilter() {
    // формируем оъект filter
    const filter: FilterModel = {};

    if (this.order) {
      filter.order = this.order;
    }

    if (this.start.date) {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }

    // console.log(filter);
    this.onFilter.emit(filter);
  }

}
