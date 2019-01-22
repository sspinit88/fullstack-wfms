import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryModel} from "../models/category.model";
import {Observable} from "rxjs/index";

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient,) {
  }

  // будем получать имеющиеся категории
  fetch(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>('api/category');
  }
}
