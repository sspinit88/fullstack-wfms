import {ElementRef} from "@angular/core";
import {MaterialWindowModel} from "../models/materialWindow.model";

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

}