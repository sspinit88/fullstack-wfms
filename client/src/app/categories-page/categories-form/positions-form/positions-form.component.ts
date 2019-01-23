import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/services/positions.service";
import {PositionModel} from "../../../shared/models/position.model";
import {MaterialService} from "../../../shared/classes/material.service";
import {MaterialWindowModel} from "../../../shared/models/materialWindow.model";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string;

  @ViewChild('modal') modalRef;

  positions: PositionModel[] = [];
  isLoading: boolean = true;
  modal: MaterialWindowModel;


  constructor(
      private positionService: PositionsService,
  ) {
  }

  ngOnInit() {
    // get all position
    this.positionService.fetch(this.categoryId)
        .subscribe(
            positions => {
              this.positions = positions;
              this.isLoading = false;
            }
        );
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  onSelectPosition(position: PositionModel) {
    this.modal.open();
  }

  onAddPosition() {
    this.modal.open();
  }

  onCansel() {
    this.modal.close();
  }

}
