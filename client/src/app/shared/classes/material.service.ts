import {ElementRef} from "@angular/core";
import {MaterialWindowModel} from "../models/materialWindow.model";
import {MaterialDatepickerModel} from "../models/MaterialDatepicker.model";

declare var M;

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializeFloatingButton(elem: ElementRef) {
    // т.к. elem: ElementRef, то у него есть метод nativeElement, в котором и лежит эл.
    M.FloatingActionButton.init(elem.nativeElement);
  };

  static updateTextInputs() {
    M.updateTextFields();
  }

  static initModal(elem: ElementRef): MaterialWindowModel {
    return M.Modal.init(elem.nativeElement);
  }

  static initTooltip(ref: ElementRef): MaterialWindowModel {
    return M.Tooltip.init(ref.nativeElement);
  }

  static initDatepicker(ref: ElementRef, onClose: () => void): MaterialDatepickerModel {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
      i18n: {
        months: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь'
        ],
        monthsShort:
            [
              'Янв',
              'Фев',
              'Мар',
              'Апр',
              'Май',
              'Июн',
              'Июл',
              'Авг',
              'Сен',
              'Окт',
              'Ноя',
              'Дек'
            ],
        weekdaysShort:
            [
              'Вс',
              'Пн',
              'Вт',
              'Ср',
              'Чт',
              'Пт',
              'Сб'
            ],
        weekdays:
            [
              'Воскресенье',
              'Понедельник',
              'Вторник',
              'Среда',
              'Четверг',
              'Пятница',
              'Суббота',
            ],
        cancel: 'Закрыть',
        clear: 'Очистить',
        done: 'Ок'
      }
    });
  }

}