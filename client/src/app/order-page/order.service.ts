import {Injectable} from '@angular/core'
import {OrderPositionModel} from "../shared/models/order-position.model";
import {PositionModel} from "../shared/models/position.model";
import {of} from "rxjs/internal/observable/of";


@Injectable()
export class OrderService {

  public list: OrderPositionModel[] = [];
  public price: number = 0;

  add(position: PositionModel) {
    const orderPosition: OrderPositionModel = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });

    // исправляю дублирование позиций
    const candidate = this.list.find(p => p._id === orderPosition._id);

    if (candidate) {
      // Изменяем кол-во. В данном случае будет замена проведена,
      // ставим += для получения суммы.
      candidate.quantity = orderPosition.quantity
    } else {
      this.list.push(orderPosition);
    }

    // высчитывает общую стоимость
    this.computePrice();
  }

  private computePrice() {
    return this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0)
  }

  remove(orderPosition: OrderPositionModel) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id);
    this.list.splice(idx, 1);
    this.computePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

}
