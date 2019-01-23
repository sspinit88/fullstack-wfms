import {ElementRef} from "@angular/core";

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
}