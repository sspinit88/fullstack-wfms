import {Component, OnInit} from '@angular/core'
import {CategoriesService} from '../../shared/services/categories.service'
import {Observable} from 'rxjs/index'
import {CategoryModel} from "../../shared/models/category.model";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<CategoryModel[]>;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }

}
