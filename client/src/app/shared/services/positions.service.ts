import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PositionModel} from "../models/position.model";
import {MessageModel} from "../models/message.model";

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

  create(position: PositionModel) {
    return this.http.post<PositionModel>(`/api/position/`, position);
  }

  update(position: PositionModel): Observable<PositionModel> {
    return this.http.patch<PositionModel>(`/api/position/${position._id}`, position);
  }

  delete(position: PositionModel): Observable<MessageModel> {
    return this.http.delete<MessageModel>(`/api/position/${position._id}`);
  }

}
