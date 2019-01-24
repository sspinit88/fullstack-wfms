import {OrderPositionModel} from "./order-position.model";

export interface OrderModel {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPositionModel[];
  _id: string;
}