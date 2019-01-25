import {Injectable} from '@angular/core'
import {OrderPositionModel} from "../shared/models/order-position.model";
import {PositionModel} from "../shared/models/position.model";


@Injectable()
export class OrderService {

  public list: OrderPositionModel[] = [];
  public price = 0;

  add(position: PositionModel) {
    const orderPosition: OrderPositionModel = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });

    // const candidate = this.list.find(p => p._id === orderPosition._id)

    // if (candidate) {
    //   // Изменяем кол-во
    //   candidate.quantity += orderPosition.quantity
    // } else {
    // debugger;
    this.list.push(orderPosition);
    console.log('this.list-1', typeof this.list);
    // }

    // this.computePrice()
  }

  // remove(orderPosition: OrderPosition) {
  //   const idx = this.list.findIndex(p => p._id === orderPosition._id);
  //   this.list.splice(idx, 1);
  //   this.computePrice()
  // }

  // clear() {
  // }

  // private computePrice() {
  //   this.price = this.list.reduce((total, item) => {
  //     return total += item.quantity * item.cost
  //   }, 0)
  // }
}
