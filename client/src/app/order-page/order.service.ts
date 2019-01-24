import {Injectable} from '@angular/core';
import {PositionModel} from "../shared/models/position.model";
import {OrderPositionModel} from "../shared/models/order-position.model";

@Injectable()
export class OrderService {

  // массив, содержащий все позиции, которые добавили
  public list: OrderPositionModel[] = [];

  public price = 0;

  add(position: PositionModel) {

    const orderPosition: OrderPositionModel = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id,
    });

    this.list.push(orderPosition);

  }

  remove() {

  }

  clear() {

  }

}
