import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialWindowModel} from "../shared/models/materialWindow.model";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialWindowModel;
  isFilterVisible = false;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.tooltip.destroy();
  }

  ngAfterViewInit() {
   this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

}
