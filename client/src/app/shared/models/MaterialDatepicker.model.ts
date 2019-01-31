// import {MaterialWindowModel} from "./materialWindow.model";

export interface MaterialDatepickerModel {
  open?(): void,
  close?(): void,
  destroy?(): void,
  date?: Date,
}