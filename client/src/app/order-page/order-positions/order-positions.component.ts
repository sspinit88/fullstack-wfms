import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PositionsService} from "../../shared/services/positions.service";
import {Observable} from "rxjs/internal/Observable";
import {PositionModel} from "../../shared/models/position.model";
import {map, switchMap} from "rxjs/operators";
import {OrderService} from "../order.service";


@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss'],
  providers: [OrderService],
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<PositionModel[]>;

  constructor(
      private activatedRoute: ActivatedRoute,
      private positionsService: PositionsService,
      private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.positions$ = this.activatedRoute.params
        .pipe(
            switchMap((params: Params) => {
              return this.positionsService.fetch(params['id']);
            }),
            map((positions: PositionModel[]) => {
              return positions.map(positions => {
                positions.quantity = 1;
                return positions;
              })
            }),
        )
  }

  addOrder(position: PositionModel) {
    this.orderService.add(position);
  }

}
