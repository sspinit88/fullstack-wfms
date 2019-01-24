import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {PositionsService} from "../../../shared/services/positions.service";
import {PositionModel} from "../../../shared/models/position.model";
import {MaterialService} from "../../../shared/classes/material.service";
import {MaterialWindowModel} from "../../../shared/models/materialWindow.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  positions: PositionModel[] = [];
  isLoading: boolean = false;
  modal: MaterialWindowModel;
  form: FormGroup;
  positionId = null;

  constructor(
      private positionService: PositionsService,
  ) {
  }

  ngOnInit() {
    this.isLoading = true;

    // form init
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
    });

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
    // определяя positionId, даем понять, что находимся в состоянии редактирования
    this.positionId = position._id;

    this.form.patchValue({
      // помещаем в поля для редактирования значения полей позиции
      name: position.name,
      cost: position.cost
    })
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onAddPosition() {
    // определяя positionId = null, даем понять, что находимся в состоянии добавления позиции
    this.positionId = null;
    this.form.reset({name: null, cost: 1});
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onCansel() {
    this.modal.close();
  }

  onDeletePosition(event: Event,position: PositionModel) {
    event.stopPropagation();

    const decision = window.confirm(`Удалить позицию ${position.name}?`);

    if (decision) {
      this.positionService.delete(position).subscribe(
          response => {
            const idx = this.positions.findIndex(p => p._id === position._id);
            this.positions.splice(idx, 1);
            MaterialService.toast(`Позиция "${position.name}" удалена.`);
          },
          error => MaterialService.toast(error.error.message),
      )
    } else {

    }

  }

  onSubmit() {
    this.form.disable();

    const newPosition: PositionModel = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      // id получаем при переходе в компонент
      category: this.categoryId,
    }

    const completed = () => {
      this.modal.close();
      this.form.reset({name: '', cost: 1});
      this.form.enable();
    }

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionService.update(newPosition).subscribe(
          position => {
            // найходим индекс изменяемой позиции
            const idx = this.positions.findIndex(p => p._id === position._id);
            // сохраняем в массиве по номеру индекса
            // присланную с сервера обновленную позицию
            this.positions[idx] = position;
            MaterialService.toast('Позиция изменена.')
          },
          error => MaterialService.toast(error.error.message),
            completed,
      );
    } else {
      this.positionService.create(newPosition)
          .subscribe(position => {
                MaterialService.toast('Позиция создана.')
                this.positions.push(position);
              },
              error => MaterialService.toast(error.error.message),
              completed,
          );
    }
  }

}
