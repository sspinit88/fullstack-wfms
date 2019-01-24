import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../shared/services/categories.service";
import {Observable} from "rxjs/internal/Observable";
import {CategoryModel} from "../../shared/models/category.model";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  // создаем переменную, в которую будем сохранять стрим
  categories$: Observable<CategoryModel[]>;

  constructor(
      private categoriesServices: CategoriesService,
  ) {
  }

  ngOnInit() {
    // get all categories
    this.categories$ = this.categoriesServices.fetch();
    console.log(this.categories$);
  }

}
