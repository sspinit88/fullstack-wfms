import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PositionModel} from "../models/position.model";

@Injectable()
export class PositionsService {

  constructor(
      private http: HttpClient,
  ) {
  }

  // получение всех позиций, относящихся к конкретной категории
  fetch(categoryId: string): Observable<PositionModel[]> {
    return this.http.get<PositionModel[]>(`/api/position/${categoryId}`);
  }


}
