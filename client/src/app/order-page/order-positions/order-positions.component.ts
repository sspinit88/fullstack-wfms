import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'
import {PositionsService} from '../../shared/services/positions.service'
import {Observable} from 'rxjs/index'
import {switchMap, map} from 'rxjs/operators'
import {OrderService} from '../order.service'
import {MaterialService} from '../../shared/classes/material.service'
import {PositionModel} from "../../shared/models/position.model";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<PositionModel[]>;

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private order: OrderService) {
  }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map(
          (positions: PositionModel[]) => {
            return positions.map(position => {
              position.quantity = 1;
              return position
            })
          }
        )
      )
  }

  addToOrder(position: PositionModel) {
    MaterialService.toast(`Добавлено x${position.quantity}`);
    this.order.add(position)
  }

}
