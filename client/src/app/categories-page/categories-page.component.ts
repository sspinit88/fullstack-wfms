import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {CategoryModel} from "../shared/models/category.model";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  // вывод лоадера с помощью флага - старый подход, прогрессивный - с помощью pipe async
  // для того, что бы вернуть старый вариант с лоадером - снять коммент после пометки $isLoader
  // вернуть условие для показа блоков в html.component
  // $isLoader
  // isLoading: boolean = false;
  // categories: CategoryModel[] = [];

  // с pipe async
  // categories$ - $ означает, что данная переменная явлю rxjs-стримом и является асинхронной
  categories$: Observable<CategoryModel[]>;

  constructor(
      private categoriesService: CategoriesService,
  ) {}

  ngOnInit() {
    // work with loader
    // $isLoader
    // this.isLoading = true;

    // get all categories + $$isLoader
    // this.categoriesService.fetch().subscribe(categories => {
    //   this.isLoading = false;
    //   this.categories = categories;
    // });

    this.categories$ = this.categoriesService.fetch();
  }

  trackByFn(index, item) {
    return item.id;
  }

}
