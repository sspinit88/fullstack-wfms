import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryModel} from "../models/category.model";
import {Observable} from "rxjs/index";
import {MessageModel} from "../models/message.model";

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient,) {
  }

  // будем получать все имеющиеся категории
  fetch(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>('api/category');
  }

  getCategoryById(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`/api/category/${id}`)
  }

  // создание новой категории
  create(name: string, image?: File): Observable<CategoryModel> {

    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('name', name);

    return this.http.post<CategoryModel>('/api/category', fd);
  }

  // обновление категории
  update(id: string, name: string, image?: File): Observable<CategoryModel> {

    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('name', name);
    console.log(id, name, image);
    return this.http.patch<CategoryModel>(`/api/category/${id}`, fd);
  }

  // удаление категории
  delete(id: string): Observable<MessageModel> {
    return this.http.delete<MessageModel>(`/api/category/${id}`);
  }

}
